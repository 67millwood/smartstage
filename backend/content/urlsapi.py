from django.urls import path

from rest_framework import routers
from .api import QuestionViewSet, ReadingViewSet, MultipleChoiceViewSet, TrueFalseViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('api/questions', QuestionViewSet.as_view()),
    path('api/readings', ReadingViewSet.as_view()),
    path('api/multiplechoice', MultipleChoiceViewSet.as_view()),
    path('api/truefalse', TrueFalseViewSet.as_view()),

]

urlpatterns += router.urls
