from rest_framework import serializers 
from .models import UserBelts
from content.models import BeltLevel
from users.serializers import CustomUserSerializer
from django.contrib.auth import authenticate

# User Serializer

class BeltLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeltLevel
        fields = ('__all__')

class UserBeltsSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer()
    belt_level = BeltLevelSerializer()
    class Meta:
        model = UserBelts
        fields = ('__all__')





