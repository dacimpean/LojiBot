from django.urls import path

from . import views

app_name = 'send'


urlpatterns = [
    path('general_email/', views.general_email),
    # path('invitation/', views.invitation),
    # path('ship/', views.ship),
    path('tracking/', views.tracking),
    # path('delivered/', views.thanks)
]
