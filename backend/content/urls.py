from django.urls import path
from . import views


app_name = 'content'
urlpatterns = [
  path('', views.index, name='index'),
  path('start/', views.starting_point, name='starting_point'),
  path('mybelts/', views.UserBeltPage.as_view(), name='my-belts'),
  path('start/myquestions/', views.MyQuestions.as_view(), name='my-questions'),


]

urlpatterns += [

]