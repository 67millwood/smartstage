from .models import Question, Reading
from rest_framework import viewsets, permissions, generics
from .serializers import QuestionSerializer, ReadingSerializer


# Question Viewset
class QuestionViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = QuestionSerializer
    def get_queryset(self):
        questionlist = Question.objects.one_level_questions(category=1, level=1)
        return questionlist['result']

# Reading Viewset
class ReadingViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ReadingSerializer
    queryset = Reading.objects.filter(belt_level=1, category=1)

