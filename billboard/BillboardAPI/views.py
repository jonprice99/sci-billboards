from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from billboard.models import TestTable
from django.views.decorators.csrf import csrf_exempt

# db imports
from posts.models import Posts

# Create your views here.

@api_view(['POST'])
def insert(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        field = data.get('test_field')
        
        #test insertion into dummy table
        test = TestTable(field)
        test.save()
        
        return Response("Test table insertion successful", status=status.HTTP_200_OK)

