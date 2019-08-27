from django.urls import path

from rest_framework import routers
from .api import (
    AccuracyAPI,
    CategoryAccuracyAPI,
)

router = routers.DefaultRouter()

urlpatterns = [
    path('api/accuracy', AccuracyAPI.as_view()),
    path('api/accuracy/bycategory', CategoryAccuracyAPI.as_view()),

]

urlpatterns += router.urls
