from django.urls import path

from rest_framework import routers
from .api import QuestionViewSet, ReadingViewSet, MultipleChoiceViewSet, TrueFalseViewSet, RatingViewSet, RankingViewSet, ShuffleSetViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('api/questions', QuestionViewSet.as_view()),
    path('api/readings', ReadingViewSet.as_view()),
    path('api/multiplechoice', MultipleChoiceViewSet.as_view()),
    path('api/truefalse', TrueFalseViewSet.as_view()),
    path('api/rating', RatingViewSet.as_view()),
    path('api/ranking', RankingViewSet.as_view()),
    path('api/shuffleset', ShuffleSetViewSet.as_view()),

]

urlpatterns += router.urls
