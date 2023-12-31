import json
from django.shortcuts import render
from django.http import HttpResponse
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.db.models import F

import json

from django.contrib.auth import login

from BillboardAPI.models import *
from BillboardAPI.serializers import *

import logging

logger = logging.getLogger('api.views')


# Create your views here.

# dummy authenticator ... TO BE IMPLEMENTED
def authenticate(username, password):
    return True

# Login handler
@api_view(['POST'])
def user_login(request):
    if request.method=='POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        valid = authenticate(username=username, password=password)
        
        if valid:
            return Response("Login!", status=status.HTTP_202_ACCEPTED)
        else:
            return Response("Failed LOGIN!", status=status.HTTP_401_UNAUTHORIZED)
        

@api_view(['GET'])
def users_list(request):
    users = Users.objects.all()
    serializer = UsersSerializer(users, many=True)
    logger.info('Response Data: %s', serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def user_upvotes_list(request):
    users_upvotes = User_Upvotes.objects.all()
    serializer = User_UpvotesSerializer(users_upvotes, many=True)
    logger.info('Response Data: %s', serializer.data)
    return Response(serializer.data)

@api_view(['GET'])
def disallowed_users_list(request):
    users = Disallowed_Users.objects.all()
    serializer = Disallowed_UsersSerializer(users, many=True)
    logger.info('Response Data: %s', serializer.data)
    return Response(serializer.data)

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
def get_public_posts(request):
    posts = Posts.objects.filter(is_hidden=False)
    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_posts(request):
    posts = Posts.objects.all()
    serializer = PostsSerializer(posts, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_comments(request):
    comments = Comments.objects.all()
    serializer = CommentsSerializer(comments, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_post_comments(request, category_id, post_id):
    comments = Comments.objects.filter(category_id=category_id, post_id=post_id, is_hidden=False)
    serializer = CommentsSerializer(comments, many=True)
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

@api_view(['PATCH'])
def update_category(request, id):
    try:
        Categories.objects.filter(id=id).update(**request.data)
        category = Categories.objects.get(id=id)
        serializer = CategoriesSerializer(category)
        return Response(serializer.data)
    except Categories.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def mod_update_post(request, category_id, post_id):
    try:
        Posts.objects.filter(category_id=category_id, post_id=post_id).update(**request.data)
        post = Posts.objects.get(category_id=category_id, post_id=post_id)
        serializer = PostsSerializer(post)
        return Response(serializer.data)
    except Posts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@api_view(['PATCH'])
def mod_update_comment(request, category_id, post_id, comment_id):
    try:
        Comments.objects.filter(category_id=category_id, post_id=post_id, comment_id=comment_id).update(**request.data)
        comment = Comments.objects.get(category_id=category_id, post_id=post_id, comment_id=comment_id)
        serializer = CommentsSerializer(comment)
        return Response(serializer.data)
    except Comments.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PATCH'])
def update_user(request, id):
    try:
        Users.objects.filter(id=id).update(**request.data)
        user = Users.objects.get(id=id)
        serializer = UsersSerializer(user)
        return Response(serializer.data)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def update_disallowed_user(request, username):
    try:
        Disallowed_Users.objects.filter(username=username).update(**request.data)
        user = Disallowed_Users.objects.get(username=username)
        serializer = Disallowed_UsersSerializer(user)
        return Response(serializer.data)
    except Disallowed_Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def add_user(request):
    serializer = UsersSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_user_upvote(request):
    serializer = User_UpvotesSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_disallowed_user(request):
    serializer = Disallowed_UsersSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_comment(request):
    serializer = CommentsSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
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
def delete_category(request, id):
    try:
        category = Categories.objects.get(id=id)
    except Categories.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_post(request, category_id, post_id):
    try:
        post = Posts.objects.get(category_id=category_id, post_id=post_id)
    except Posts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    post.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_comment(request, category_id, post_id, comment_id):
    try:
        comment = Comments.objects.get(category_id=category_id, post_id=post_id, comment_id=comment_id)
    except Posts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    comment.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_user(request, id):
    try:
        user = Users.objects.get(id=id)
    except Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_disallowed_user(request, username):
    try:
        user = Disallowed_Users.objects.get(username=username)
    except Disallowed_Users.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['DELETE'])
def delete_user_upvote(request, category_id, post_id, username):
    try:
        user_upvote = User_Upvotes.objects.get(category_id=category_id, post_id=post_id, username=username)
    except User_Upvotes.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    user_upvote.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
def inc_upvote(request, category_id, post_id):
    try:
        Posts.objects.filter(category_id=category_id, post_id=post_id).update(upvotes=F('upvotes') + 1)
        return Response({"message": "Upvote incremented successfully"}, status=status.HTTP_200_OK)
    except Posts.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PATCH'])
def dec_upvote(request, category_id, post_id):
    try:
        Posts.objects.filter(category_id=category_id, post_id=post_id).update(upvotes=F('upvotes') - 1)
        return Response({"message": "Upvote decremented successfully"}, status=status.HTTP_200_OK)
    except Posts.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PATCH'])
def flag_post(request, category_id, post_id):
    try:
        Posts.objects.filter(category_id=category_id, post_id=post_id).update(is_pending_mod=F(True))
        Posts.objects.filter(category_id=category_id, post_id=post_id).update(is_hidden=F(True))
    
        return Response({"message": "Post flagged successfully"}, status=status.HTTP_200_OK)
    except Posts.DoesNotExist:
        return Response({"error": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    