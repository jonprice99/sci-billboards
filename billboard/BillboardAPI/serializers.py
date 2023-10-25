from rest_framework import serializers
from .models import Categories, CareerServices

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'
        
class CareerServicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerServices
        fields = '__all__'