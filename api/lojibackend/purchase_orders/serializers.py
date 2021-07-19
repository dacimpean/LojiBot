from rest_framework import serializers

from purchase_orders.models import *


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
        fields = ['id', 'user', 'po', 'note', 'date_created', 'status']


class PurchaseOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrderItem
        fields = ['id', 'po', 'unit_price', 'qty', 'name', 'desc', 'qb_link']
