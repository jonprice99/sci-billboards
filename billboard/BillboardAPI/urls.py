from django.urls import path
from . import views

urlpatterns = [
    path('api/categories/', views.categories_list, name='categories-list'),
    path('api/career-services/', views.career_services_list, name='career-services-list'),
]