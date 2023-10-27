from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories_list, name='categories-list'),
    path('categories/<str:href>', views.category_by_href, name='category-by-href'),
    path('posts/<int:cat_id>', views.posts_list, name='posts-list'),
    path('posts/create/', views.create_post, name='create-post'),
]