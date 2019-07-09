from django.shortcuts import render
from django.http import HttpResponse

from .serializers import UserBeltsSerializer
from rest_framework import generics, permissions
from .models import UserBelts


# Create your views here.
def index(request):
  return render(request, 'belts/beltshome.html')

class UserBeltsList(generics.ListCreateAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    queryset = UserBelts.objects.all()
    serializer_class = UserBeltsSerializer


