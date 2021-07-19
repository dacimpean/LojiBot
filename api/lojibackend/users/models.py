from django.db import models
from django.contrib.auth.models import AbstractUser


class UserCompany(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=24)
    realmid = models.CharField(verbose_name="QB's realm id", max_length=50)

    def __str__(self):
        return self.name


class PreRegisteredTeamMember(models.Model):
    email = models.EmailField()
    company_id = models.ForeignKey(UserCompany, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.email


class ExtendUser(AbstractUser):
    phone = models.CharField(blank=True, max_length=255)
    tier = models.CharField(blank=True, max_length=6)
    is_manager = models.BooleanField(default=False)
    company_id = models.ForeignKey(UserCompany, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.email

