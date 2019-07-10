from .models import UserBelts
from content.models import BeltLevel
from rest_framework import viewsets, permissions, generics
from .serializers import UserBeltsSerializer, BeltLevelSerializer


# UserBelt Viewset
class UserBeltViewSet(viewsets.ModelViewSet):
    queryset = UserBelts.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserBeltsSerializer

# UserBelt Viewset
class SingleUserBeltViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserBeltsSerializer

    def get_queryset(self):
        user = self.request.user
        beltlist = UserBelts.objects.filter(user=user)
        return beltlist


