from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from BillboardAPI.models import Categories
from BillboardAPI.serializers import CategoriesSerializer


# Create your views here.

@api_view(['GET'])
def categories_list(request):
    categories = Categories.objects.all()
    serializer = CategoriesSerializer(categories, many=True)
    return Response(serializer.data)



