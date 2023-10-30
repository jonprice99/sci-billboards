from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories_list, name='categories-list'),
    path('categories/<str:href>', views.category_by_href, name='category-by-href'),
    path('posts/', views.get_all_posts, name='get-all-posts'),
    path('posts/<int:category_id>', views.posts_list, name='posts-list'),
    path('posts/<int:category_id>/<int:post_id>', views.get_post, name='get-post'),
    path('posts/create/', views.create_post, name='create-post'),
]