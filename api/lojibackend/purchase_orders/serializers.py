from rest_framework import serializers

from purchase_orders.models import *


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['name']


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['user', 'company', 'phone', 'manager']


class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'name', 'city', 'state', 'zip', 'country', 'phone', 'contact_name', 'email']


class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = [
            'vendor', 'id',
            'time_created', 'time_modified',
            'due_date', 'ship_method', 'status', 'ship_date',
        ]


class PurchaseOrderNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderNote
        fields = ['user', 'po', 'note', 'date_created', 'status']


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Part
        fields = ['name', 'brand', 'desc']


class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderItem
        fields = ['po', 'part',  'unit_price', 'qty']