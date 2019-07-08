from .models import CustomUser
from .serializers import CustomUserSerializer
from rest_framework import generics, permissions


class UserList(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer