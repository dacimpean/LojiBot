from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import ExtendUser

class ExtendUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = ExtendUser
        fields = ('username', 'email')

class ExtendUserChangeForm(UserChangeForm):

    class Meta:
        model = ExtendUser
        fields = UserChangeForm.Meta.fields