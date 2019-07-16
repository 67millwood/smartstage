from django.urls import path

from rest_framework import routers
from .api import QuestionViewSet, ReadingViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('api/allquestions', QuestionViewSet.as_view()),
    path('api/readings', ReadingViewSet.as_view()),

]

urlpatterns += router.urls
