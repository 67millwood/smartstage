from .models import Question, Reading, MultipleChoice, TrueFalse, Rating, Ranking
from belts.models import UserBelts
from rest_framework import viewsets, permissions, generics
from .serializers import QuestionSerializer, ReadingSerializer, MultipleChoiceSerializer, TrueFalseSerializer, RatingSerializer, RankingSerializer, IdSerializer, MegaDeskSerializer

from data.scenarios.question_creation import app_question_set


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
'''
# MultipleChoice Viewset
# Returns a queryset of all Multiple Choice questions for a given belt level and category
# Can be used for any of the question types
class MultipleChoiceViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MultipleChoiceSerializer
    def get_queryset(self):
        user = self.request.user
        category = self.request.query_params.get('category')
        beltlist = UserBelts.objects.all_belts(user=user)
        highest_belt = beltlist['highest_belt_level']
        return MultipleChoice.objects.filter(belt_level=highest_belt, category=category)
'''
# MultipleChoice Viewset 
# Pulls one Mulitple Choice question if the question_ptr_id (postgres) is provided
class MultipleChoiceViewSet(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MultipleChoiceSerializer
    def get_object(self):
        questionid = self.request.query_params.get('questionid')
        return MultipleChoice.objects.get(pk=questionid)


# TrueFalse Viewset
class TrueFalseViewSet(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = TrueFalseSerializer
    def get_object(self):
        questionid = self.request.query_params.get('questionid')
        return TrueFalse.objects.get(pk=questionid)

# Rating Viewset
class RatingViewSet(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = RatingSerializer
    def get_object(self):
        questionid = self.request.query_params.get('questionid')
        return Rating.objects.get(pk=questionid)

# Ranking Viewset
class RankingViewSet(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = RankingSerializer
    def get_object(self):
        questionid = self.request.query_params.get('questionid')
        return Ranking.objects.get(pk=questionid)

# ShuffleViewset
class ShuffleSetViewSet(generics.ListAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = MegaDeskSerializer
    
    def get_queryset(self):
        user = self.request.user
        category = self.request.query_params.get('category')

        questionlist = app_question_set(user=user, category=category)
        return questionlist
