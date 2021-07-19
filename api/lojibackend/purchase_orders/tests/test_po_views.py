import pytest
from datetime import datetime
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.test import TestCase

from users.models import ExtendUser, UserCompany
from purchase_orders.models import PurchaseOrder, Vendor


@pytest.mark.django_db
class ViewsTestCase(TestCase):
    """Test suite for Purchase Orders Views"""
    def setUp(self):
        company = UserCompany(name='Test Company')
        company.save()
        self.user = ExtendUser(
            email='test@test.test',
            username='test',
            password='test',
            company_id=company
        )
        self.user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user, token='test')

    def test_add_po_note(self):
        url = reverse('purchaseorders:po_notes-list')
        data = {
            'note': 'test message',
            'po': 1,
            'status': 'test',
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.data, {})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
