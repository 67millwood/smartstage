from datetime import date, timedelta

from belts.models import UserAnswer
from content.models import Category

  # every category specific question the user has ever attempted right or wrong
  # double __ allows foreign keys to get into other tables on .filter
def category_attempts(user):
    category_accuracy_data = []
    
    for category in Category.objects.all():
      category_data = {}
      category_user_answers = UserAnswer.objects.all().filter(user=user).filter(question__category=category.id).count()
      correct_answers = UserAnswer.objects.all().filter(user=user).filter(question__category=category.id).filter(correct=True).distinct().count()
      if category_user_answers == 0:
        accuracy = 'not applicable'
      else:
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
