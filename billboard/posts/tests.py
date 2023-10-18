from django.test import TestCase, Client
from django.urls import reverse

# Create your tests here.


def test_insert(self):
    response = self.client.post(reverse('insert'), {
        'test_field': 'Hello world',
    })
    
    self.assertEqual(response.status_code, 200)