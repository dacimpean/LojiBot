from rest_framework import routers
from rest_framework.renderers import CoreJSONRenderer
from django.urls import path, include
from . import views

app_name = 'purchaseorders'
router = routers.DefaultRouter()
router.register(r'vendors', views.VendorViewSet, 'po_vendors')
router.register(r'purchaseorders', views.PurchaseOrderViewSet, 'purchase_orders')
router.register(r'purchaseordernotes', views.PurchaseOrderNoteViewSet, 'po_notes')
router.register(r'purchaseorderitems', views.PurchaseOrderItemViewSet, 'po_items')
router.default_schema_renderers = [CoreJSONRenderer]


urlpatterns = [
    path('', include(router.urls)),
]
