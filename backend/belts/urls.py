from django.urls import path

from . import views

app_name = 'belts'

urlpatterns = [
  path('', views.index, name='index'),
  ]
