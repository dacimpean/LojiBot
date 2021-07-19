from rest_framework import serializers
from django.utils import six
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from . import models

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        token['email'] = user.email
        return token

class PreRegisteredTeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PreRegisteredTeam
        fields = ('email', )


class UserSerializer(serializers.ModelSerializer):

    class Meta: 
        model = models.ExtendUser
        fields = ('email', 'username', )

class SignupSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        validators=[UniqueValidator(queryset=models.ExtendUser.objects.all())]
    )
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = models.ExtendUser
        fields = ('email',  'username', 'password', )
    
    # def create(self, validated_data):
    #     company_data = validated_data.pop('company')
    #     user = User.objects.create(**validated_data)
    #     Company.objects.create(user=user, **company_data)
    #     return user