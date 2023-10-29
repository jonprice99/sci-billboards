from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from BillboardAPI.models import Categories, Posts
from BillboardAPI.serializers import CategoriesSerializer, PostsSerializer

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
def posts_list(request):
    posts = Posts.objects.all()
    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def category_by_href(request, href):
    category = Categories.objects.get(href=href)
    serializer = CategoriesSerializer(category)
    return Response(serializer.data)

@api_view(['POST'])
def create_post(request):
    serializer = PostsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)