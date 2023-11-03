from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from BillboardAPI.models import Categories, Posts, User_Upvotes
from BillboardAPI.serializers import CategoriesSerializer, PostsSerializer, User_UpvotesSerializer

import logging

logger = logging.getLogger('api.views')


# Create your views here.

@api_view(['GET'])
def categories_list(request):
    categories = Categories.objects.filter(isArchived=False)
    serializer = CategoriesSerializer(categories, many=True)
    logger.info('Response Data: %s', serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def mod_categories_list(request):
    categories = Categories.objects.all()
    serializer = CategoriesSerializer(categories, many=True)
    logger.info('Response Data: %s', serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def posts_list(request, category_id):
    posts = Posts.objects.filter(category_id=category_id, is_hidden=False)
    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_posts(request):
    posts = Posts.objects.all()
    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def category_by_href(request, href):
    category = Categories.objects.get(href=href)
    serializer = CategoriesSerializer(category)
    return Response(serializer.data)

@api_view(['GET'])
def get_post(request, category_id, post_id):
    post = Posts.objects.get(category_id=category_id, post_id=post_id)
    serializer = PostsSerializer(post, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def update_category(request, pk):
    try:
        category = Categories.objects.get(pk=pk)
    except Categories.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CategoriesSerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_post(request):
    serializer = PostsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_category(request):
    serializer = CategoriesSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_category(request, pk):
    try:
        category = Categories.objects.get(pk=pk)
    except Categories.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def inc_upvote(request, category_id, post_id):
    try:
        post = Posts.objects.get(category_id=category_id, post_id=post_id)
        post.upvotes += 1
        post.save()
        return Response({"message": "Upvote incremented successfully"}, status=status.HTTP_200_OK)
    except Posts.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def dec_upvote(request, category_id, post_id):
    try:
        post = Posts.objects.get(category_id=category_id, post_id=post_id)
        post.upvotes -= 1
        post.save()
        return Response({"message": "Upvote decremented successfully"}, status=status.HTTP_200_OK)
    except Posts.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
