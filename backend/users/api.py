from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from knox.models import AuthToken
from .models import CustomUser

from .serializers import (
  CustomUserSerializer,
  RegisterSerializer, 
  LoginSerializer, 
  PwdChangeSerializer,
  EmailChangeSerializer,
)


# Register API
class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": CustomUserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

# Login API
class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    return Response({
      "user": CustomUserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

# DeleteAccount API
class DeleteAccountAPI(APIView):
  def get_object(self):
    return self.request.user

  def delete(self, request, *args, **kwargs):
    self.object = self.get_object()
    self.object.delete()
    return Response('deleted')


# PwdChange API
class PwdChangeAPI(generics.UpdateAPIView):
        serializer_class = PwdChangeSerializer

        def get_object(self):
            return self.request.user
            
        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                # set_password also hashes the password that the user will get
                self.object.set_password(serializer.data.get("new_password"))
                self.object.save()
                return Response('success!!!!')

            return Response(serializer.errors)

# EmailChange API
class EmailChangeAPI(generics.UpdateAPIView):
        serializer_class = EmailChangeSerializer

        def get_object(self):
            return self.request.user
            
        def update(self, request, *args, **kwargs):
            self.object = self.get_object()
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                self.object.email = serializer.data.get("email")
                self.object.save()
                return Response('email change success!!!!')

            return Response(serializer.errors)


# Get User API
class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user


