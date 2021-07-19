from django.db import models
from lojibackend.settings import AUTH_USER_MODEL


class QuickBooksUser(models.Model):
    user = models.ForeignKey(AUTH_USER_MODEL,verbose_name='User',on_delete=models.CASCADE,unique=True)
    access_token = models.CharField(verbose_name='QB access token',max_length=1000)
    refresh_token = models.CharField(verbose_name='QB refresh token',max_length=1000)
    realm_id = models.CharField(verbose_name="QB's realm id",max_length=50)

    def __str__(self):
        return str(self.user)
# Create your models here.
