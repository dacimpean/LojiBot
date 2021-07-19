from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from django.views import View
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.response import Response

from purchase_orders.models import PurchaseOrder

from rest_framework import viewsets
from drf_yasg.inspectors import SwaggerAutoSchema
from purchase_orders.serializers import *


class CompanyViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class ProfileViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class VendorViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer


class PurchaseOrderViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    serializer_class = PurchaseOrderSerializer
    # queryset = PurchaseOrder.objects.filter()

    def create(self, request, *args, **kwargs):
        '''
        Alter serializer to include company id from user request. 
        '''
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
        '''
        This view should return a list of all purchase
        orders for the currently authenticated user by 
        their company. 
        '''
        company_id = self.request.user.company_id
        return PurchaseOrder.objects.filter(company_id=company_id)


class PurchaseOrderNoteViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    queryset = PurchaseOrderNote.objects.all()
    serializer_class = PurchaseOrderNoteSerializer


class PartViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    queryset = Part.objects.all()
    serializer_class = PartSerializer


class PurchaseOrderItemViewSet(viewsets.ModelViewSet):
    swagger_schema = SwaggerAutoSchema
    queryset = PurchaseOrderItem.objects.all()
    serializer_class = PurchaseOrderItemSerializer
