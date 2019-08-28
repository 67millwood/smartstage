from django.urls import path

from rest_framework import routers
from .api import (
    AccuracyAPI,
    CategoryAccuracyAPI,
    BreadthAPI,
    ConsistencyAPI,
)

router = routers.DefaultRouter()

urlpatterns = [
    path('api/accuracy', AccuracyAPI.as_view()),
    path('api/accuracy/bycategory', CategoryAccuracyAPI.as_view()),
    path('api/breadth', BreadthAPI.as_view()),
    path('api/consistency', ConsistencyAPI.as_view()),

]

urlpatterns += router.urls
