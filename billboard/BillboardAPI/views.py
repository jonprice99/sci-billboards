from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from BillboardAPI.models import Categories
from BillboardAPI.serializers import CategoriesSerializer, CareerServicesSerializer

import logging

logger = logging.getLogger('api.views')


# Create your views here.

@api_view(['GET'])
def categories_list(request):
    categories = Categories.objects.all()
    serializer = CategoriesSerializer(categories, many=True)
    logger.info('Response Data: %s', serializer.data)
    return Response(serializer.data)


@api_view(['GET'])
def career_services_list(request):
    career_services = CareerServices.objects.all()
    serializer = CareerServicesSerializer(career_services, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def create_career_service(request):
    serializer = CareerServicesSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)