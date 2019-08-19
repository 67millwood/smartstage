from rest_framework import serializers 
from .models import CustomUser
from django.contrib.auth import authenticate

from django.contrib.auth.hashers import make_password

# User Serializer

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'middle_name',)

# Register Serializer

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'middle_name',)
        extra_kwargs = {'password': {'write_only': True}}


    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            password=make_password(
                validated_data['password']   
            )
        )
        return user

# Login Serializer
class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Nope")

# PwdChange Serializer

class PwdChangeSerializer(serializers.Serializer):
    
    new_password = serializers.CharField(max_length=600)



