from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from . import models


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['email'] = user.email
        return token


class PreRegisteredTeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PreRegisteredTeamMember
        fields = ('email', 'id')


class UserSerializer(serializers.ModelSerializer):

    class Meta: 
        model = models.ExtendUser
        fields = ('email', 'username', 'id', 'is_manager')


class SignupSerializer(serializers.ModelSerializer):
    email = serializers.CharField(validators=[
        UniqueValidator(queryset=models.ExtendUser.objects.all()),
    ])
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = models.ExtendUser
        fields = ('email',  'username', 'password', )
