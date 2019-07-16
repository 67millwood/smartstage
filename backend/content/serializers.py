from rest_framework import serializers 
from .models import Question
from users.serializers import CustomUserSerializer
from django.contrib.auth import authenticate

# Question Serializer

class QuestionSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    # do i need all of the things serialized? belt_level = BeltLevelSerializer()
    class Meta:
        model = Question
        fields = ('__all__')





