from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories_list, name='categories-list'),
    path('posts/', views.posts_list, name='posts-list'),
    path('posts/create/', views.create_post, name='create-post'),
]