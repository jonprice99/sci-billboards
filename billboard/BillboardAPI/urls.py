from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories_list, name='categories-list'),
    path('categories/<str:href>', views.category_by_href, name='category-by-href'),
    path('categories/create', views.create_category, name='create-category'),
    path("categories/update/<int:category_id>/", views.update_category, name="update_category"),
    path("api/categories/delete/<int:category_id>/", views.delete_category, name="delete_category"),
    path('posts/', views.get_all_posts, name='get-all-posts'),
    path('posts/<int:category_id>', views.posts_list, name='posts-list'),
    path('posts/<int:category_id>/<int:post_id>', views.get_post, name='get-post'),
    path('posts/create/', views.create_post, name='create-post'),
]