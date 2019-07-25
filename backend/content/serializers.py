from rest_framework import serializers 
from .models import Question, Reading, Category, MultipleChoice, TrueFalse, Rating, Ranking
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

# True/False Serializer
class TrueFalseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrueFalse
        fields = ('__all__')

# Rating Serializer
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('__all__')

# Ranking Serializer
class RankingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ranking
        fields = ('__all__')

# ID Serializer
class IdSerializer(serializers.Serializer):
    id = serializers.IntegerField(max_value=None, min_value=None)

# MegaDesk Serializer
class MegaDeskSerializer(serializers.Serializer):
    #standard Question fields
    id = serializers.IntegerField(max_value=None, min_value=None)
    question_text = serializers.CharField(max_length=600)
    correct_response = serializers.CharField(max_length=600)
    incorrect_response = serializers.CharField(max_length=600)
    pub_date = serializers.DateTimeField(input_formats=None, default_timezone=None)
    belt_level_id = serializers.IntegerField(max_value=None, min_value=None)
    category_id = serializers.IntegerField(max_value=None, min_value=None)
    qtype_id = serializers.IntegerField(max_value=None, min_value=None)

    #multiple choice fields
    

