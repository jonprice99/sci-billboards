from rest_framework import serializers
from .models import *

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
        
class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'
        
class User_UpvotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Upvotes
        fields = '__all__'
        
class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = '__all__'
        
class Posts_Pending_ModSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts_Pending_Mod
        fields = '__all__'
        
class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'
        
class Comments_Pending_ModSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments_Pending_Mod
        fields = '__all__'