from django.shortcuts import render
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework import viewsets
from rest_framework.views import APIView

from . import utils

from . import models
from . import serializers


LOJI_EMAILS = {
    'support': 'lojitest@gmail.com',
    'customer_service': 'customerservice@lojiservices.com',
    'tech_support': 'it@lojiservices.com'
}

LOJI_URLS = {
    'home': 'https://www.loji.com/',
    'register': 'https://www.loji.com/register/',
    'pre_registration_form': 'https://www.loji.com/pre-register/',
}


# Create your views here.

class UserListView(generics.ListAPIView):
    '''
    get:
    Get all users in Loji
    '''
    queryset = models.ExtendUser.objects.all()
    serializer_class = serializers.UserSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = serializers.UserSerializer(queryset, many=True)
        return Response(serializer.data)

class TeamRegistrationView(generics.CreateAPIView):
    # Share the same serializer as a regular user, with modifications
    # servier side - Company_id and etc
    serializer_class = serializers.SignupSerializer
    permision_classes = (AllowAny, )

    def post(self, request, *args, **kwargs):
        pass

class PreRegisteredTeamView(generics.CreateAPIView):
    '''
    post:
    Sends invitation to a team member
    '''
    invite_email_tempalte = ''
    serializer_class = serializers.PreRegisteredTeamSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serialized_team_member = serializers.PreRegisteredTeamSerializer(data=request.data)
        if serialized_team_member.is_valid():
            if PreRegisteredTeamView.send_email(serialized_team_member.initial_data['email'],
                                                request.user.username,
                                                request.user.company_id,
                                                request):
                # Create a user in the Preregistered table
                new_user = PreRegisteredTeam(serialized_team_member.initial_data['email'], request.user.company_id)
                new_user.save()
                return Response(status=status.HTTP_201_CREATED)
            return Response(status=HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serialized_user._errors, status=status.HTTP_400_BAD_REQUEST)

    def check_company_count():
        '''
        Check to see if the manager has avaliable slots to send
        out more invites.
        '''
        return None

    def send_email(email, username, company_id, request):
        '''
        Prepare the email and send it out the invitation
        '''
        # tokens = serializers.MyTokenObtainPairSerializer(request.data).validate(request.data)
        access_token = utils.JWTHelper.get_simplejwt_tokens(request.user)['access']
        subject = "Hello! " + str(username) + " has sent you an invite!"
        from_email = LOJI_EMAILS['support']
        # TODO remove this and create a proper invitation.
        html_content = ('''
            Go here to register...
            <a href='/'>Sign up!</a>
            TOKEN: %s
        ''' % str(access_token))
        text_content = ''
        msg = EmailMultiAlternatives(subject, text_content, from_email, [email,])
        msg.attach_alternative(html_content, "text/html")
        if msg.send():
            return True
        return False

class RegisterUsersView(generics.CreateAPIView):
    '''
    get:

    post:
    Register a user and assign it a default company value
    '''
    serializer_class = serializers.SignupSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serialized_user = serializers.SignupSerializer(data=request.data)
        if serialized_user.is_valid():
            # Default company to beign with
            company = models.UserCompany(name='John Peterson\'s Company')
            company.save()
            user = models.ExtendUser.objects.create_user(
                serialized_user.initial_data['username'],
                serialized_user.initial_data['email'],
                serialized_user.initial_data['password'],
            )
            user.company_id = company
            user.save()

            tokens = serializers.MyTokenObtainPairSerializer(request.data).validate(request.data)
            return Response(tokens, status=status.HTTP_201_CREATED)
        else:
            return Response(serialized_user._errors, status=status.HTTP_400_BAD_REQUEST)

class UserInfoView(APIView):
    def get(self,request):
        return Response({'username':request.user.username,
                         'email':request.user.email},status=status.HTTP_200_OK)
