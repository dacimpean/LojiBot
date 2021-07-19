from django.shortcuts import render,redirect
from django.http import HttpResponse
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.utils.six import text_type

import json,requests
from purchase_orders.models import Vendor, PurchaseOrder, PurchaseOrderItem
from users.models import ExtendUser
from users.models import UserCompany
from intuitlib.client import AuthClient
from django.conf import settings
from users.serializers import MyTokenObtainPairSerializer
from .models import QuickBooksUser

#Initialie auth client for intuit integration
intuit_auth_client = AuthClient(
    settings.INTUIT_CLIENT_ID,
    settings.INTUIT_CLIENT_SECRET,
    settings.INTUIT_REDIRECT_URI,
    settings.INTUIT_ENVIRONMENT,
)

@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def auth(request):
    '''
    Route for generating auth url for QB oauth2
    '''
    url = intuit_auth_client.get_authorization_url(settings.INTUIT_SCOPES)
    return redirect(url)


@api_view(['GET'])
@authentication_classes(())
@permission_classes(())
def auth_redirect(request):
    """
    Redirect view for intuit oauth2 flow
    This is the last step where intuit server grants access to client account
    """
    # convert auth code to access token
    intuit_auth_client.get_bearer_token(request.GET.get('code'))
    # get info about user
    userinfo = json.loads(intuit_auth_client.get_user_info().content)

    # get or create new user
    user, created = ExtendUser.objects.get_or_create(email=userinfo['email'],
                                                     username=userinfo['email'])

    realm_id = request.GET.get('realmId')
    # check if there is a default app company exist and create if not
    uc, created = UserCompany.objects.get_or_create(realmid=realm_id)
    if created:
        uc.name = 'Company_{}'.format(realm_id)
        uc.save()
    user.company_id = uc
    user.save()

    # save access token for QB for user
    qb_user, created = QuickBooksUser.objects.get_or_create(user=user)
    qb_user.access_token = intuit_auth_client.access_token
    qb_user.refresh_token = intuit_auth_client.refresh_token
    qb_user.realm_id = realm_id
    qb_user.save()

    # generate JWT token for user
    refresh = MyTokenObtainPairSerializer.get_token(user)

    # make first sync
    response = fetch_purchase_orders(user)

    if response.status_code == 200:
        # send JWT token to the frontend
        return redirect("{}?access={}&refresh={}".format(
            settings.INTUIT_APP_REDIRECT_URI,
            text_type(refresh.access_token),
            text_type(refresh))
        )
    return response


@api_view(['POST'])
def sync(request):
    """
    API route for synchronization with QB
    """
    return fetch_purchase_orders(request.user)


@api_view(['POST'])
def test_qb_connect(request):
    """
    API route for test connection and refresh QB tokens
    """
    try:
        qb_user = QuickBooksUser.objects.get(user=request.user)
    except QuickBooksUser.DoesNotExist:
        return Response({'error': 'the current user is not registered as a QB user'}, status=400)
    access_token = qb_user.access_token
    refresh_token = qb_user.refresh_token
    realm_id = qb_user.realm_id

    base_url = settings.INTUIT_QBO_BASE_URL
    url = '{0}/v3/company/{1}/companyinfo/{1}'.format(base_url, realm_id)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    qb_connect_res = qb_request(qb_user, refresh_token, url, headers)
    if 'error' in qb_connect_res:
        return Response({'error': qb_connect_res['error'],
                         'data': qb_connect_res.get('data', '')},
                        status=qb_connect_res['status'])
    try:
        company_info = json.loads(qb_connect_res['data']).get('CompanyInfo', {})
    except ValueError:
        company_info = {}
    domain = company_info.get('domain', '')
    company_name = company_info.get('CompanyName', '')
    if not domain and not company_name:
        message = 'an incorrect QB server response (code {}):{}'.format(
            qb_connect_res['status'], qb_connect_res['data'])
        return Response({'error': message}, status=400)
    message = 'you are successfully connected to domain {} and company {}, {}'.format(domain, company_name,
                                                                                      qb_connect_res['success'])
    print('debug: {}'.format(message))
    return Response({'success': message}, status=200)


def qb_request(qb_user, refresh_token, url, headers):
    response = requests.get(url, headers=headers)
    tokens_used_message = 'old tokens were used'
    if response.status_code >= 400:
        url_lambda = settings.AWS_REFRESH_TOKENS_ENDPOINT
        api_key = settings.AWS_API_KEY
        headers_lambda = {
            'x-api-key': api_key,
        }
        response_lambda = requests.get(url_lambda, headers=headers_lambda, params={'refresh_token': refresh_token})
        if response_lambda.status_code != 200:
            return {'error': 'connection error with lambda function', 'data': response_lambda.text, 'status': 400}
        json_data = json.loads(response_lambda.text)
        new_access_token = json_data.get('access_token')
        new_refresh_token = json_data.get('refresh_token')
        if new_access_token and new_refresh_token:
            qb_user.access_token = new_access_token
            qb_user.refresh_token = new_refresh_token
            qb_user.save()
        else:
            return {'error': 'received incorrect tokens', 'data': response_lambda.text, 'status': 400}
        auth_header = 'Bearer {0}'.format(new_access_token)
        headers['Authorization'] = auth_header
        response = requests.get(url, headers=headers)
        if response.status_code >= 400:
            return {'error': 'connection error', 'data': response.text, 'status': 400}
        tokens_used_message = 'new tokens were used'
    print('debug: qb request detected, {}'.format(tokens_used_message))
    return {'success': tokens_used_message, 'status': 200, 'data': response.text}


def fetch_purchase_orders(user):
    """
    Append to purchase orders models new items from QB database
    """
    # get access_token for quick books
    try:
        qb_user = QuickBooksUser.objects.get(user=user)
    except QuickBooksUser.DoesNotExist:
        return Response({'message': "SignUp with QuickBooks first"}, status=401)
    access_token = qb_user.access_token
    refresh_token = qb_user.refresh_token
    realm_id = qb_user.realm_id

    # prepare API request
    base_url = settings.INTUIT_QBO_BASE_URL
    select_statement = 'select * from PurchaseOrder'
    url = '{0}/v3/company/{1}/query?query={2}'.format(base_url,
                                                      realm_id,
                                                      select_statement)
    auth_header = 'Bearer {0}'.format(access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    # make API call
    qb_connect_res = qb_request(qb_user, refresh_token, url, headers)
    if 'success' in qb_connect_res:
        # perform serialization
        pos_content = json.loads(qb_connect_res['data'])

        # iterate purchase orders
        record_count = 0
        record_updated = 0
        record_created = 0
        record_hold = 0

        try:
            company = UserCompany.objects.get(realmid=realm_id)
        except UserCompany.DoesNotExist:
            return Response({'error': 'realmID is not associated with an existing company',
                             'data': 'realmID={}'.format(realm_id)}, status=422)

        Vendor.objects.filter(company=company).update(sync=False)
        PurchaseOrder.objects.filter(company=company).update(sync=False)

        for po in pos_content['QueryResponse']['PurchaseOrder']:
            record_count += 1

            vendor_default = {'name': po['VendorRef']['name'],
                              'city': po['VendorAddr']['Line4'].split(',')[0],
                              'state': po['VendorAddr']['Line4'].split()[1],
                              'zip': po['VendorAddr']['Line4'].split()[2],
                              'contact_name': po['VendorAddr']['Line1'],
                              'sync': True
                              }
            vendor, vendor_created = Vendor.objects.update_or_create(qb_id=po['VendorRef']['value'],
                                                                     company=company,
                                                                     defaults=vendor_default)
            if vendor_created:
                print('debug: created vendor {}'.format(po['VendorRef']['name']))

            po_defaults = {'vendor': vendor,
                           'time_created': po['MetaData']['CreateTime'],
                           'time_modified': po['MetaData']['LastUpdatedTime'],
                           'total_amount': po['TotalAmt'],
                           'sync': True
                           }
            purchase_order, po_created = PurchaseOrder.objects.update_or_create(qb_id=po['Id'],
                                                                                company=company,
                                                                                defaults=po_defaults)
            if po_created:
                record_created += 1
                purchase_order.status = 'OA'
                purchase_order.save()
                print('debug: created po {}'.format(purchase_order))
            else:
                record_updated += 1
                items_queryset = PurchaseOrderItem.objects.filter(po=purchase_order)
                if items_queryset.exists():
                    items_queryset.delete()

            for line in po['Line']:
                if line['DetailType'] == 'ItemBasedExpenseLineDetail':
                    PurchaseOrderItem.objects.create(po=purchase_order,
                                                     unit_price=line['ItemBasedExpenseLineDetail']['UnitPrice'],
                                                     qty=line['ItemBasedExpenseLineDetail']['Qty'],
                                                     name=line['ItemBasedExpenseLineDetail']['ItemRef']['name'],
                                                     desc=line.get('Description', ''),
                                                     qb_link=line['ItemBasedExpenseLineDetail']['ItemRef']['value']
                                                     )
        qset_po_completed = PurchaseOrder.objects.filter(company=company, status='COMPLETED')
        for po_completed in qset_po_completed:
            Vendor.objects.get(id=po_completed.vendor).update(sync=True)
            po_completed.sync = True
            po_completed.save()
        qset_po_hold = PurchaseOrder.objects.filter(company=company, sync=False)
        if qset_po_hold.exists():
            record_hold = qset_po_hold.count()
            for po_hold in qset_po_hold:
                Vendor.objects.get(id=po_hold.vendor).update(sync=True)
                po_hold.sync = True
                po_hold.status = 'HOLD'
                po_hold.save()
        queryset_unused_vendors = Vendor.objects.filter(company=company, sync=False)
        if queryset_unused_vendors.exists():
            count = queryset_unused_vendors.count()
            queryset_unused_vendors.delete()
            print('debug: deleted {} unused vendors'.format(count))
        message = 'data successfully synchronized for created:{}, updated:{}, set to hold:{} records'.format(
            record_created, record_updated, record_hold)
        print('debug: {}'.format(message))
        return Response({'success': message}, status=qb_connect_res['status'])

    # if API call failed
    print('debug: error [{}] with code:{}, text:{}'.format(qb_connect_res['error'],
                                                           qb_connect_res['status'],
                                                           qb_connect_res.get('data', '')))
    return Response({'error': qb_connect_res['error'],
                     'data': qb_connect_res.get('data', '')},
                    status=qb_connect_res['status'])
