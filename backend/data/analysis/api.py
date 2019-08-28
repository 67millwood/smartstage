from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from belts.models import UserAnswer
from belts.serializers import AnswerSerializer

from .consistency import short_term, medium_term, long_term

# Accuracy API
class AccuracyAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get(self, user):
        user = self.request.user
        answers = UserAnswer.objects.all_attempts(user=user)
        correct = answers['correct_answers'].count()
        all_attempts = answers['all_answered'].count()

        accuracy = round(100*correct/all_attempts)
        return Response({
            "correct": correct, 
            "all_attempts": all_attempts, 
            "accuracy": accuracy,
            })

class CategoryAccuracyAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, user):
        user = self.request.user
        answers = UserAnswer.objects.category_attempts(user=user)
        return Response(answers)

class BreadthAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, user):
        user = self.request.user
        answers = UserAnswer.objects.breadth(user=user)
        return Response(answers)

class ConsistencyAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, user):
        user = self.request.user
        one = short_term(user=user)
        two = medium_term(user=user)
        three = long_term(user=user)
        return Response({
            "short": one,
            "med": two,
            "long": three,
        })
