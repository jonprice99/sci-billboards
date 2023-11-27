from django.urls import path
from . import views

urlpatterns = [
    path('mod/categories/', views.mod_categories_list, name='mod-categories-list'),
    path('mod/posts/', views.get_all_posts, name='get-all-posts'),
    path('mod/comments/', views.get_all_comments, name='get-all-comments'),
    path('mod/users/', views.users_list, name='get-all-users'),
    path('mod/users/add', views.add_user, name='add-user'),
    path('mod/users/update/<int:user_id>', views.update_user, name='update-user'),
    path('mod/users/delete/<int:user_id>', views.delete_user, name='delete-user'),
    path('mod/disallowed_users/', views.disallowed_users_list, name='get-all-disallowed-users'),
    path('mod/disallowed_users/add', views.add_disallowed_user, name='add-disallowed-user'),
    path('mod/disallowed_users/update/<str:username>', views.update_disallowed_user, name='update-disallowed_user'),
    path('mod/disallowed_users/delete/<str:username>', views.delete_disallowed_user, name='delete-disallowed-user'),
    path("mod/posts/update/<int:category_id>/<int:post_id>", views.mod_update_post, name="mod-update-post"),
    path("mod/comments/update/<int:category_id>/<int:post_id>/<int:comment_id>", views.mod_update_comment, name="mod-update-comment"),
    path('categories/', views.categories_list, name='categories-list'),
    path('categories/<str:href>', views.category_by_href, name='category-by-href'),
    path('categories/create/', views.create_category, name='create-category'),
    path("categories/update/<int:id>/", views.update_category, name="update_category"),
    path("categories/delete/<int:id>/", views.delete_category, name="delete_category"),
    path('posts/<int:category_id>', views.posts_list, name='posts-list'),
    path('posts/<int:category_id>/<int:post_id>', views.get_post, name='get-post'),
    path('posts/create/', views.create_post, name='create-post'),
    path("posts/delete/<int:category_id>/<int:post_id>", views.delete_post, name="delete_post"),
    path('posts/inc_upvote/<int:category_id>/<int:post_id>', views.inc_upvote, name='inc-upvote'),
    path('posts/dec_upvote/<int:category_id>/<int:post_id>', views.dec_upvote, name='dec_upvote'),
    path('comments/create/', views.create_comment, name='create-comment'),
    path('comments/<int:category_id>/<int:post_id>/', views.get_post_comments, name='get-post-comments'),
    path("comments/delete/<int:category_id>/<int:post_id>/<int:comment_id>/", views.delete_comment, name="mod-delete-comment"),
    path('posts/flag_post/<int:category_id>/<int:post_id>', views.flag_post, name='flag_post'),
    #path('user_upvotes/', views.user_upvotes_list, name='get-user-upvotes'),
]