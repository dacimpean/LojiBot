import pytest
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from django.test import TestCase

from users.models import ExtendUser, UserCompany
from users.serializers import UserSerializer


@pytest.mark.django_db
class ViewsTestCase(TestCase):
    """Test suite for Users Views"""
    def setUp(self):
        company = UserCompany(name='Test Company')
        company.save()
        self.user = ExtendUser.objects.create(
            email='test@test.test',
            username='test',
            password='test',
            company_id=company
        )
        self.user.save()
        self.client = APIClient()
        self.client.force_authenticate(user=self.user, token='test')

    def test_invite_team_member(self):
        url = reverse('users:invite_team_member')
        data = {'email': 'new@team.member'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_invite_team_member_with_wrong_email(self):
        url = reverse('users:invite_team_member')
        data = {'email': 'wrong_email_address'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_whoami_with_credentials(self):
        url = reverse('users:whoami')
        response = self.client.get(url)
        serialized_user = UserSerializer(self.user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serialized_user.data)

    def test_whoami_without_credentials(self):
        url = reverse('users:whoami')
        client = APIClient()
        response = client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
