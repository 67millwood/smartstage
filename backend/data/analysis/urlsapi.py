from django.urls import path

from rest_framework import routers
from .api import (
    AccuracyAPI,
)

router = routers.DefaultRouter()

urlpatterns = [
    path('api/accuracy', AccuracyAPI.as_view()),

]

urlpatterns += router.urls
