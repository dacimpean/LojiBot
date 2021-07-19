from django.urls import path

from . import views

urlpatterns = [
    # Landing pages (outside, no login)
    path('', views.Website().get_main, name="main"),
    path('pricing/', views.Website().get_pricing, name="pricing"),
    path('help/', views.Website().get_help, name="help"),
    path('terms/', views.Website().get_terms, name="terms"),
    path('privacy/', views.Website().get_privacy, name="privacy"),
]
