from rest_framework import routers
from rest_framework.renderers import CoreJSONRenderer
from django.urls import path, include
from . import views

app_name = 'purchaseorders'
router = routers.DefaultRouter()
router.register(r'vendors', views.VendorViewSet)
router.register(r'purchaseorders', views.PurchaseOrderViewSet, 'purchaseorders')
router.register(r'purchaseordernote', views.PurchaseOrderNoteViewSet, 'purchaseordernotes')
router.register(r'part', views.PartViewSet, 'part')
router.register(r'purchaseorderpart', views.PurchaseOrderItemViewSet, 'purchaseorderspart')
router.default_schema_renderers = [CoreJSONRenderer]


urlpatterns = [
    path('', include(router.urls)),
]