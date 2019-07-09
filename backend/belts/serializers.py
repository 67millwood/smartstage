from rest_framework import serializers 
from .models import UserBelts
from django.contrib.auth import authenticate

# User Serializer

class UserBeltsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBelts
        fields = ('user', 'belt_level', 'notches_complete',)



