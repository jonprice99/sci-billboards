from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.categories_list, name='categories-list'),
    path('career-services/', views.career_services_list, name='career-services-list'),
    path('career-services/create/', views.create_career_service, name='create-career-service'),
]