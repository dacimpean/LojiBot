from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class UserCompany(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=24)

    def __str__(self):
        return self.name

class PreRegisteredTeam(models.Model):
    email = models.EmailField()
    company_id = models.ForeignKey(UserCompany, on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.email

class ExtendUser(AbstractUser):
    phone = models.CharField(blank=True, max_length=255)
    tier = models.CharField(blank=True, max_length=6)
    isManager = models.IntegerField(null=True, blank=True)
    company_id = models.ForeignKey(UserCompany, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.email

