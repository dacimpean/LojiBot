from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.template.loader import get_template
from django.template.exceptions import TemplateDoesNotExist
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

from .models import UserCompany, ExtendUser, PreRegisteredTeamMember
from . import serializers


class RegisterUsersView(generics.CreateAPIView):
    """
    get:

    post:
    Register a user and assign it a default company value
    """
    serializer_class = serializers.SignupSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serialized_user = serializers.SignupSerializer(data=request.data)
        if serialized_user.is_valid():
            email = serialized_user.validated_data.get('email')
            try:
                pre_registered_user = PreRegisteredTeamMember.objects.get(email=email)
                company = UserCompany.objects.get(id=pre_registered_user.company_id_id)
                pre_registered_user.delete()
            except PreRegisteredTeamMember.DoesNotExist:
                username = serialized_user.validated_data.get('username')
                company = UserCompany(name="{}'s Company".format(username))
                company.save()
            user = ExtendUser.objects.create_user(**serialized_user.validated_data)
            user.company_id = company
            user.save()

            tokens = serializers.MyTokenObtainPairSerializer(request.data).validate(request.data)
            return Response(tokens, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized_user.errors, status=status.HTTP_400_BAD_REQUEST)


class UserInfoView(generics.RetrieveAPIView):
    def get(self, request, *args, **kwargs):
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PreRegisteredTeamMemberView(generics.CreateAPIView):
    """
    post:
    Sends invitation to a team member
    """
    invite_email_template = 'email/invite_team_member'
    serializer_class = serializers.PreRegisteredTeamMemberSerializer

    def post(self, request, *args, **kwargs):
        serialized_team_member = serializers.PreRegisteredTeamMemberSerializer(data=request.data)
        if serialized_team_member.is_valid():
            company_id = request.user.company_id.id
            company = UserCompany.objects.get(id=company_id)
            # TODO: validate user permissions/available team seats
            pre_registered_team_member = PreRegisteredTeamMember(**serialized_team_member.validated_data,
                                                                 company_id=company)
            pre_registered_team_member.save()
            self.send_invitation_mail(request.user, company, pre_registered_team_member)
            serialized_response = serializers.PreRegisteredTeamMemberSerializer(pre_registered_team_member)
            return Response(serialized_response.data, status=status.HTTP_201_CREATED)

        return Response(serialized_team_member.errors, status=status.HTTP_400_BAD_REQUEST)

    def send_invitation_mail(self, manager, company, invited_user):
        subject = "Loji: You've been invited to {}".format(company.name)
        sender = settings.EMAIL_SENDER
        context = {
            'manager': manager.email,
            'company_name': company.name,
            'auth_link': settings.LINK_TO_SIGNUP,
        }
        try:
            html_template = get_template("{}.html".format(self.invite_email_template))
            text_template = get_template("{}.txt".format(self.invite_email_template))
            html = html_template.render(context)
            text = text_template.render(context)
            message = EmailMultiAlternatives(subject, text, sender, (invited_user.email, ))
            message.attach_alternative(html, 'text/html')
        except TemplateDoesNotExist:
            message_text = "{} invited you to {} company".format(manager.email, company.name)
            message = EmailMultiAlternatives(subject, message_text, sender, (invited_user.email,))
        message.send()


class TeamMembersView(generics.ListAPIView):
    serializer_class = serializers.UserSerializer

    def get_queryset(self):
        company_id = self.request.user.company_id
        return ExtendUser.objects.filter(company_id=company_id)


class InvitedUsersView(generics.ListAPIView):
    serializer_class = serializers.PreRegisteredTeamMemberSerializer

    def get_queryset(self):
        company_id = self.request.user.company_id
        return PreRegisteredTeamMember.objects.filter(company_id_id=company_id)

