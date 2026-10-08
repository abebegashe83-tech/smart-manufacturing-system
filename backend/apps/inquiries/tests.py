from django.test import TestCase
from rest_framework.test import APIClient

from .models import Inquiry


class InquirySubmissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.payload = {
            'name': 'Ada Lovelace',
            'email': 'ada@example.com',
            'company': 'Analytical Engines',
            'message': 'Please send a product catalog.',
        }

    def test_submission_is_saved(self):
        response = self.client.post('/api/inquiries/submit/', self.payload, format='json')

        self.assertEqual(response.status_code, 201)
        self.assertEqual(Inquiry.objects.count(), 1)
        inquiry = Inquiry.objects.get()
        self.assertEqual(inquiry.email, self.payload['email'])
        self.assertEqual(response.data['submitted']['id'], inquiry.id)

    def test_missing_required_field_is_rejected(self):
        payload = {**self.payload, 'company': ''}

        response = self.client.post('/api/inquiries/submit/', payload, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('company', response.data)
        self.assertEqual(Inquiry.objects.count(), 0)

    def test_invalid_email_is_rejected(self):
        payload = {**self.payload, 'email': 'not-an-email'}

        response = self.client.post('/api/inquiries/submit/', payload, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('email', response.data)
        self.assertEqual(Inquiry.objects.count(), 0)
