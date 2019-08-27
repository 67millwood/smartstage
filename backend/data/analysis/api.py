from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response

from belts.models import UserAnswer

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

        category_answers = UserAnswer.objects.category_attempts(user=user)
        category_correct = category_answers['category_correct_answers'].count()
        category_all_attempts = category_answers['category_answered'].count()
        return Response({
            "correct": correct, 
            "all_attempts": all_attempts, 
            "accuracy": accuracy,
            "critical": category_all_attempts,
            "criticalcorrect": category_correct,
            })

