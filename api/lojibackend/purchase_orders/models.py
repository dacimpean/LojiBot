from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import User
from lojibackend.settings import AUTH_USER_MODEL
from django.db import models
from users.models import UserCompany

import pycountry


COUNTRIES = [(country.alpha_2, country.name) for country in pycountry.countries]

phone_regex = RegexValidator(
    regex=r'^\+?1?\d{9,15}$',
    message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
)


class BaseModel(models.Model):
    created_by = models.ForeignKey(
        AUTH_USER_MODEL,
        verbose_name=_('Created by'),
        related_name='created_%(class)s',
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(
        verbose_name=_('Created at'),
        auto_now_add=True
    )
    changed_by = models.ForeignKey(
        AUTH_USER_MODEL,
        verbose_name=_('Changed by'),
        related_name='changed_%(class)s',
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )
    changed_at = models.DateTimeField(
        verbose_name=_('Changed at'),
        auto_now=True
    )

    class Meta:
        abstract = True


class Company(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=100)

    class Meta:
        verbose_name = _('Company')
        verbose_name_plural = _('Companies')

    def __str__(self):
        return self.name


class Profile(models.Model):
    user = models.OneToOneField(AUTH_USER_MODEL, verbose_name=_('User'), on_delete=models.CASCADE)
    company = models.ForeignKey(Company, verbose_name=_('Company'), on_delete=models.CASCADE)
    phone = models.CharField(verbose_name=_('Phone'), validators=[phone_regex], max_length=17, blank=True)
    manager = models.IntegerField(verbose_name=_('Manager'), null=True, blank=True)

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')

    def __str__(self):
        return self.user.username


class Vendor(models.Model):
    company = models.ForeignKey(UserCompany, verbose_name=_('Company'), on_delete=models.CASCADE, default=0)
    name = models.CharField(verbose_name=_('Name'), max_length=100)
    city = models.CharField(verbose_name=_('City'), max_length=100)
    state = models.CharField(verbose_name=_('State'), max_length=100)
    zip = models.CharField(verbose_name=_('Zip'), max_length=100)
    country = models.CharField(
        verbose_name=_('Country'),
        choices=COUNTRIES,
        max_length=255,
        null=True,
        blank=True,
    )
    phone = models.CharField(verbose_name=_('Phone'), validators=[phone_regex], max_length=17, blank=True)
    contact_name = models.CharField(verbose_name=_('Contact Name'), max_length=100, null=True, blank=True)
    email = models.EmailField(verbose_name=_('Email'), null=True, blank=True)
    qb_id = models.PositiveIntegerField(verbose_name=_('Id from QuickBooks'),null=True,blank=True)

    class Meta:
        verbose_name = _('Vendor')
        verbose_name_plural = _('Vendors')

    def __str__(self):
        return self.name


class PurchaseOrder(models.Model):
    users = models.ManyToManyField(Profile, blank=True, through='PurchaseOrderNote')
    vendor = models.ForeignKey(Vendor, verbose_name=_('Vendor'), on_delete=models.CASCADE)
    company = models.ForeignKey(UserCompany, verbose_name=_('Company'), on_delete=models.CASCADE,default=0)
    time_created = models.DateTimeField(verbose_name=_('Created at'), auto_now_add=True)
    time_modified = models.DateTimeField(verbose_name=_('Modified at'), auto_now=True)
    due_date = models.DateField(verbose_name=_('Due Date'), null=True, blank=True)
    ship_method = models.CharField(verbose_name=_('Ship Method'), max_length=100, null=True, blank=True)
    status = models.CharField(verbose_name=_('Status'), max_length=100, null=True, blank=True)
    ship_date = models.DateField(verbose_name=_('Ship Date'), null=True, blank=True)
    qb_id = models.PositiveIntegerField(verbose_name=_('Id from QuickBooks'),null=True,blank=True)
    tracking_number = models.CharField(max_length=16,verbose_name=_('Tracking number'),null=True,blank=True)


    class Meta:
        verbose_name = _('PurchaseOrder')
        verbose_name_plural = _('PurchaseOrders')

    def __str__(self):
        return self.vendor.name


class PurchaseOrderNote(models.Model):
    user = models.ForeignKey(Profile, verbose_name=_('User'), on_delete=models.CASCADE)
    po = models.ForeignKey(PurchaseOrder, verbose_name=_('PurchaseOrder'), on_delete=models.CASCADE)
    note = models.TextField(verbose_name=_('Note'), null=True, blank=True)
    date_created = models.DateTimeField(verbose_name=_('Created at'), auto_now_add=True)
    status = models.CharField(verbose_name=_('Status'), max_length=100)

    class Meta:
        verbose_name = _('PurchaseOrderNote')
        verbose_name_plural = _('PurchaseOrderNotes')

    def __str__(self):
        return self.user.user.username + ' - ' + self.po.vendor.name + ' - ' + self.po.company.name


class Part(models.Model):
    name = models.CharField(verbose_name=_('Name'), max_length=100)
    brand = models.CharField(verbose_name=_('Brand'), max_length=100)
    desc = models.CharField(verbose_name=_('Desc'), max_length=100)
    qb_id = models.PositiveIntegerField(verbose_name=_('Id from QuickBooks'),null=True,blank=True)


    class Meta:
        verbose_name = _('Part')
        verbose_name_plural = _('Parts')

    def __str__(self):
        return self.name


class PurchaseOrderItem(models.Model):
    po = models.ForeignKey(PurchaseOrder, verbose_name=_('PurchaseOrder'), on_delete=models.CASCADE)
    part = models.ForeignKey(Part, verbose_name=_('Part'), on_delete=models.CASCADE)
    unit_price = models.DecimalField(verbose_name=_('Unit Price'), max_digits=12, decimal_places=6, default=0)
    qty = models.IntegerField(verbose_name=_('Quantity'), default=0)


    class Meta:
        verbose_name = _('PurchaseOrderItem')
        verbose_name_plural = _('PurchaseOrderItems')

    def __str__(self):
        return self.part.name + ' - ' + str(self.qty)
