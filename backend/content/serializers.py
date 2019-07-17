from rest_framework import serializers 
from .models import Question, Reading, Category
from users.serializers import CustomUserSerializer
from django.contrib.auth import authenticate

# Category Serializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('__all__')

# Reading Serializer
class ReadingSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Reading
        fields = ('__all__')

# Question Serializer

class QuestionSerializer(serializers.ModelSerializer):
    # user = CustomUserSerializer()
    # do i need all of the things serialized? belt_level = BeltLevelSerializer()
    class Meta:
        model = Question
        fields = ('__all__')



