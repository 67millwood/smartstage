from .serializers import AccuracySerializer
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from belts.serializers import AnswerSerializer
from belts.models import UserAnswer

# Accuracy API
class AccuracyAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    # serializer_class = AccuracySerializer

    def get(self, user):
        user = self.request.user
        answers = UserAnswer.objects.all_attempts(user=user)
        correct = answers['correct_answers'].count()
        all_attempts = answers['all_answered'].count()
        accuracy = round(100*correct/all_attempts)
        print(correct)
        print(accuracy)
        return Response({"correct": correct, "all_attempts": all_attempts, "accuracy": accuracy})

