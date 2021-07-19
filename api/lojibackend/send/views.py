import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.core.mail import send_mail
from django.template.loader import get_template
from django.template.exceptions import TemplateDoesNotExist

from purchase_orders.models import Vendor, PurchaseOrder


@api_view(['POST'])
def general_email(request):
    """
    API route for send email
    """
    user = request.user
    if 'po_id' not in request.data or 'template' not in request.data:
        return Response({'error': 'required input parameters po_id and template'}, status=422)
    po_id = request.data['po_id']
    template = request.data['template']
    context = request.data.get('context', '{}')
    try:
        context = json.loads(context)
    except ValueError:
        return Response({'error': 'incorrect data format in the context parameter'}, status=422)
    subject = request.data.get('subject', '')
    return common_email(user=user, po_id=po_id, template=template,
                        context=context, subject=subject)


@api_view(['POST'])
def tracking(request):
    """
    API route for send email with a request for tracking
    """
    user = request.user
    if 'po_id' not in request.data:
        return Response({'error': 'required input parameters po_id'}, status=404)
    po_id = request.data['po_id']
    try:
        po = PurchaseOrder.objects.get(id=po_id)
    except PurchaseOrder.DoesNotExist:
        return Response({'error': 'PO {} does not exist'.format(po_id)}, status=404)
    template = 'send/tracking.html'
    subject = 'Sandtex PO Tracking Request - {}'.format(po.qb_id)
    context = {'po': po,
               'user': user}
    return common_email(user=user, po_id=po_id, template=template,
                        context=context, subject=subject)


def common_email(user, po_id, template, context, subject):
    """
    common function for sending email
    """
    try:
        po = PurchaseOrder.objects.get(id=po_id)
    except PurchaseOrder.DoesNotExist:
        return Response({'error': 'PO {} does not exist'.format(po_id)}, status=404)
    try:
        vendor = Vendor.objects.get(id=po.vendor_id)
    except PurchaseOrder.DoesNotExist:
        return Response({'error': 'vendor {} does not exist'.format(po.vendor_id)}, status=404)
    email_to = vendor.email
    if not email_to:
        # dev mode
        email_to = "test_email@vendor.com"
    try:
        message_template_html = get_template(template)
    except TemplateDoesNotExist:
        return Response({'error': 'template {} does not exist'.format(template)}, status=404)
    message_content_html = message_template_html.render(context)
    template_txt = template.rsplit('.', 1)[0] + '.txt'
    try:
        message_template_txt = get_template(template_txt)
    except TemplateDoesNotExist:
        message_template_txt = None
    if message_template_txt is not None:
        message_content_txt = message_template_txt.render(context)
    else:
        message_content_txt = 'Message only in html format'
    if not subject:
        # dev mode
        subject = 'Message for po #{}'.format(po.qb_id)
    msg = EmailMultiAlternatives(subject, message_content_txt, user.email, to=[email_to],
                                 reply_to=[user.email])
    msg.attach_alternative(message_content_html, 'text/html')
    msg.send()
    return Response({'success': 'mail sent'}, status=200)

