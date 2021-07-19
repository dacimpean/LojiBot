from django.urls import include, path
from rest_framework import routers
from rest_framework.renderers import CoreJSONRenderer

from . import views

app_name = 'users'
router = routers.DefaultRouter()
# router.register(r'users', views.)
router.default_schema_renderers = [CoreJSONRenderer]

urlpatterns = [
    path('', views.UserListView.as_view()),
    path('registration/', views.RegisterUsersView.as_view()),
    path('teaminvite/', views.PreRegisteredTeamView.as_view()),
    path('teamregistration/', views.TeamRegistrationView.as_view()),
    path('whoami/', views.UserInfoView.as_view())
    # path('rest-auth/', include('rest_auth.urls')),
]
