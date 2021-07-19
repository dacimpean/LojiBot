from django.urls import path
from rest_framework import routers
from rest_framework.renderers import CoreJSONRenderer

from . import views

app_name = 'users'
router = routers.DefaultRouter()
router.default_schema_renderers = [CoreJSONRenderer]

urlpatterns = [
    path('teaminvite/', views.PreRegisteredTeamMemberView.as_view(), name='invite_team_member'),
    path('registration/', views.RegisterUsersView.as_view()),
    path('whoami/', views.UserInfoView.as_view(), name='whoami'),
    path('teammembers/', views.TeamMembersView.as_view(), name='team_members'),
    path('invitedusers/', views.InvitedUsersView.as_view(), name='invited_users')
]
