from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from belts.models import UserAnswer
from belts.serializers import AnswerSerializer

# modules for analytics can be found in data/analysis...
from .consistency import short_term, medium_term, long_term
from .accuracy import category_attempts
from .breadth import breadth

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

        if all_attempts == 0:
            accuracy = 'not applicable'
        else:
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
        answers = category_attempts(user=user)
        return Response(answers)

class BreadthAPI(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, user):
        user = self.request.user
        answers = breadth(user=user)
        return Response(answers)

class ConsistencyAPI(generics.GenericAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    def get(self, user):
        user = self.request.user
        short_term_consistency = short_term(user=user)
        medium_term_consistency = medium_term(user=user)
        long_term_consistency = long_term(user=user)
        return Response({
            "short_term": short_term_consistency,
            "medium_term": medium_term_consistency,
            "long_term": long_term_consistency,
        })
