from django.urls import path

from .views import UserBeltsList

app_name = 'belts'

urlpatterns = [
  path('api/auth/userbelts', UserBeltsList.as_view()),

  ]
