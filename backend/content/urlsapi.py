from django.urls import path

from rest_framework import routers
from .api import QuestionViewSet

router = routers.DefaultRouter()

urlpatterns = [
    path('api/userquestions', QuestionViewSet.as_view()),
]

urlpatterns += router.urls
