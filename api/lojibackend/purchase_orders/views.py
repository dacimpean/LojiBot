from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from drf_yasg.inspectors import SwaggerAutoSchema

from purchase_orders.serializers import *


class VendorViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    serializer_class = VendorSerializer

    def get_queryset(self):
        """
        Overrides the queryset and filters vendors by the company
        :return:
        """
        company_id = self.request.user.company_id
        return Vendor.objects.filter(company_id=company_id)


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    serializer_class = PurchaseOrderSerializer

    def create(self, request, *args, **kwargs):
        """
        Alter serializer to include company id from user request. 
        """
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Get users company and save it along with the PurchaseOrder
            serializer.save(company_id=request.user.company_id.id)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED,
                            headers=headers)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        """
        This view should return a list of all purchase
        orders for the currently authenticated user by 
        their company.
        """
        company_id = self.request.user.company_id
        return PurchaseOrder.objects.filter(company_id=company_id)


class PurchaseOrderNoteViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    serializer_class = PurchaseOrderNoteSerializer

    def create(self, request, *args, **kwargs):
        """
        Overrides creation of the purchase note with adding user data
        from the middleware
        :param request:
        :param args:
        :param kwargs:
        :return:
        """
        data = {'user': request.user.id}
        data.update(request.data)
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
        """
        Overrides the queryset by providing a getter, important thing is that
        we shouldn't use queryset as a property anymore because it will be
        cached for all upcoming requests after the initial one
        :return: queryset
        """
        if self.action == 'list':
            filter_po_id = self.request.query_params.get('filter_po')
            statuses = self.request.query_params.get('statuses')
            if filter_po_id is None:
                return PurchaseOrderNote.objects.all()
            if statuses is None:
                return PurchaseOrderNote.objects.filter(po=filter_po_id)
            qs = PurchaseOrderNote.objects.filter(po=filter_po_id).\
                order_by('status', '-date_created').distinct('status')
            manual_filter = qs.values_list('id', flat=True)
            qs_result = PurchaseOrderNote.objects.filter(id__in=manual_filter).order_by('date_created')
            return qs_result
        return PurchaseOrderNote.objects.all()


class PurchaseOrderItemViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    serializer_class = PurchaseOrderItemSerializer

    def get_queryset(self):
        """
        Overrides the queryset and adds an option to fetch po items by po_id
        :return:
        """
        if self.action == 'list':
            filter_po_id = self.request.query_params.get('filter_po')
            if filter_po_id is None:
                return PurchaseOrderItem.objects.all()
            return PurchaseOrderItem.objects.filter(po=filter_po_id)
        return PurchaseOrderItem.objects.all()
