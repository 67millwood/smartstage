from rest_framework import serializers 
from .models import CustomUser
from django.contrib.auth import authenticate, password_validation

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

    def validate_password(self, data):
        password_validation.validate_password(password=data, user=None)
        return data

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

class PwdChangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ('password', )

    def validate_password(self, data):
        password_validation.validate_password(password=data, user=None)
        return data

# EmailChange Serializer

class EmailChangeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CustomUser
        fields = ('email', )



