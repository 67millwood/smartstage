from .models import Question
from rest_framework import viewsets, permissions, generics
from .serializers import QuestionSerializer


# Question Viewset
class QuestionViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = QuestionSerializer

    # always check methods.  get_queryset expects a QuerySet in return.
    # create that from model managers (or at least check)
    def get_queryset(self):
        user = self.request.user
        questions = Question.objects.one_level_questions(user=user)
        return questions['result']


