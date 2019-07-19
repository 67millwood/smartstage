from .models import Question, Reading
from belts.models import UserBelts
from rest_framework import viewsets, permissions, generics
from .serializers import QuestionSerializer, ReadingSerializer


# Question Viewset
class QuestionViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = QuestionSerializer
    def get_queryset(self):
        user = self.request.user
        category = self.request.query_params.get('category')
        beltlist = UserBelts.objects.all_belts(user=user)
        highest_belt = beltlist['highest_belt_level']

        questionlist = Question.objects.one_level_questions(category=category, level=highest_belt)
        return questionlist['result']

# Reading Viewset
class ReadingViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ReadingSerializer
    def get_queryset(self):
        user = self.request.user
        category = self.request.query_params.get('category')
        beltlist = UserBelts.objects.all_belts(user=user)
        highest_belt = beltlist['highest_belt_level']
        return Reading.objects.filter(belt_level=highest_belt, category=category)

