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

  def better_one_level_questions(self, category, level):
    result = super().get_queryset().filter(category=category, belt_level=level)
    question_ids = result.values('id', 'qtype')
    '''
    answered = UserAnswer.objects.all_attempts(user=user)
    custom_answer_query = answered['correct_answers']
    '''
    question_list = []
    for item in list(question_ids):
      question_list.append(item)

    return question_list


