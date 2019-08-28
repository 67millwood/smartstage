from django.db import models
from django.db.models import Max
from content.models import Category

from statistics import stdev 

class BeltManager(models.Manager):

  def highest_belt(self, user):
    highest_belt = super().get_queryset().filter(user=user).aggregate(Max('belt_level'))
    return highest_belt.get('belt_level__max')

  def all_belts(self, user):
    user_belts_list = super().get_queryset().filter(user=user).order_by('-belt_level')
    # print(user_belts_list)
    highest_belt_name = user_belts_list.first().belt_level.belt_name
    highest_belt_level = user_belts_list.first().belt_level.belt_rank
    belt_info = {'belts': user_belts_list, 'highest_belt_name': highest_belt_name, 'highest_belt_level': highest_belt_level}
    return belt_info

class UserAnswerManager(models.Manager):
  # every question the user has ever attempted right or wrong
  def all_attempts(self, user):
    all_user_answers = super().get_queryset().filter(user=user)
    correct_answers = super().get_queryset().filter(user=user).filter(correct=True).distinct()
    user_attempts = {'all_answered': all_user_answers, 'correct_answers': correct_answers}
    return user_attempts

  # every category specific question the user has ever attempted right or wrong
  # double __ allows foreign keys to get into other tables on .filter
  def category_attempts(self, user):
    category_accuracy_data = []
    
    for category in Category.objects.all():
      category_data = {}
      category_user_answers = super().get_queryset().filter(user=user).filter(question__category=category.id).count()
      correct_answers = super().get_queryset().filter(user=user).filter(question__category=category.id).filter(correct=True).distinct().count()
      accuracy = round(100*correct_answers/category_user_answers)
      category_data =  {
        "category": category.name,
        "color": category.color,
        "answered": category_user_answers,
        "correct": correct_answers,
        "accuracy": accuracy,
      }
      category_accuracy_data.append(category_data)
    
    return category_accuracy_data

  # breadth borrows data from all_attempts and category_attempts to give a sense of balance
  def breadth(self, user):
    category_answered = self.category_attempts(user=user)
    total_questions = 0
    total_correct = 0
    counter = 0
    for category in category_answered:
      total_questions += category['answered']
      total_correct += category['correct']
      counter += 1
    
    category_mean = 100/counter
    answered_data = []
    correct_data = []
    breadth_packet = []

    for category in category_answered:
      breadth_analytics = {}
      category_answered_percentage = category['answered']/total_questions
      category_correct_perecentage = category['correct']/total_correct
      answered_data.append(category_answered_percentage)
      correct_data.append(category_correct_perecentage)
      breadth_analytics = {
        "category": category['category'],
        "color": category['color'],

      }
      breadth_packet.append(breadth_analytics)

    
    answer_breadth = 100*stdev(answered_data)
    correct_breadth = 100*stdev(correct_data)
    print(answer_breadth)
    print(correct_breadth)
    breadth_payload = {
      "breadth_data": breadth_packet,
      "answer_deviation": answer_breadth,
      "correct_deviation": correct_breadth,
    }
    
    return breadth_payload
