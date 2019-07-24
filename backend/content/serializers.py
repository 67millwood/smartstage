from rest_framework import serializers 
from .models import Question, Reading, Category, MultipleChoice, TrueFalse
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
    class Meta:
        model = Question
        fields = ('__all__')

# Multiple Choice Serializer
class MultipleChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultipleChoice
        fields = ('__all__')

# True/False Choice Serializer
class TrueFalseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrueFalse
        fields = ('__all__')




