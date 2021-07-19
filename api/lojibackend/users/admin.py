from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import ExtendUserCreationForm, ExtendUserChangeForm
from .models import ExtendUser,UserCompany


# Register your models here.
class ExtendUserAdmin(UserAdmin):
    add_form = ExtendUserCreationForm
    form = ExtendUserChangeForm
    model = ExtendUser
    list_display = ['email', 'username', 'phone', 'company_id']


admin.site.register(ExtendUser, ExtendUserAdmin)
admin.site.register(UserCompany)
