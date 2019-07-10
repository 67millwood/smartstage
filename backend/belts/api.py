from .models import UserBelts
from rest_framework import viewsets, permissions
from .serializers import UserBeltsSerializer

# UserBelt Viewset
class UserBeltViewSet(viewsets.ModelViewSet):
    queryset = UserBelts.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserBeltsSerializer

