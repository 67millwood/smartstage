from django.db import models
from django.db.models import Max


class QuestionManager(models.Manager):
# gets all available questions for a user for a specifc category and specific belt level
# returns a dictionary
  def one_level_questions(self, category, level):
    result = super().get_queryset().filter(category=category, belt_level=level)
    question_list = list(result)
    question_info = {'result': result, 'question_list': question_list}

    return question_info

"""
  def question_maker(self, category, level):
    result = super().get_queryset().filter(qtype=1, category=category, belt_level=level)
    question_list = list(result)
    print(question_list[0].id, question_list[0].qtype_id)
    return result
"""

