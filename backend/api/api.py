from belts.models import UserAnswer
from rest_framework import viewsets, permissions
from .serializers import UserAnswerSerializer

# UserAnswer Viewset
class UserAnswerViewSet(viewsets.ModelViewSet):
  queryset = UserAnswer.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]
  serializer_class = UserAnswerSerializer