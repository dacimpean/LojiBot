from django.urls import include, path

from . import views

app_name = 'quickbooks_sync'


urlpatterns = [
    path('sync/', views.sync),
    path('auth/', views.auth),
    path('redirect/', views.auth_redirect),
    path('testqbconnect/', views.test_qb_connect),
    # path('rest-auth/', include('rest_auth.urls')),
]
