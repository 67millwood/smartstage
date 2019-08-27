from django.db import models
from django.db.models import Max

class BeltManager(models.Manager):

  def highest_belt(self, user):
    highest_belt = super().get_queryset().filter(user=user).aggregate(Max('belt_level'))
    return highest_belt.get('belt_level__max')

  def all_belts(self, user):
    user_belts_list = super().get_queryset().filter(user=user).order_by('-belt_level')
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
    category_user_answers = super().get_queryset().filter(user=user).filter(question__category=3)
    correct_answers = super().get_queryset().filter(user=user).filter(question__category=3).filter(correct=True).distinct()
    category_attempts = {'category_answered': category_user_answers, 'category_correct_answers': correct_answers}
    return category_attempts

