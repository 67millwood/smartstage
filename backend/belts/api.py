from .models import UserBelts, UserAnswer
from content.models import BeltLevel
from rest_framework.response import Response
from rest_framework.decorators import api_view

from rest_framework import viewsets, permissions, generics
from .serializers import UserBeltsSerializer, BeltLevelSerializer, AnswerSerializer


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

    # always check methods.  get_queryset expects a QuerySet in return.
    # create that from model managers (or at least check)
    def get_queryset(self):
        user = self.request.user
        beltlist = UserBelts.objects.all_belts(user=user)

        return beltlist['belts']

# AnswerViewSet
class AnswerViewSet(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    
    serializer_class = AnswerSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        
        return Response({
        "feedback": serializer.evaluate(request.data, user),
        })


