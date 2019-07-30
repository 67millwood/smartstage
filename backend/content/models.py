from django.db import models
from django.conf import settings
from datetime import datetime

from .manager import QuestionManager


# Create your models here.

# Belt levels avaialable
class BeltLevel(models.Model):
  belt_name = models.CharField(max_length=25)
  belt_color = models.CharField(max_length=25)
  belt_rank = models.PositiveSmallIntegerField(null=True)
  belt_notches = models.PositiveSmallIntegerField(null=True)
  def __str__(self):
        return 'Belt: %s - level %s' % (self.belt_name, self.belt_rank)

  class Meta:
    ordering =['belt_rank']

# Categories for questions (ie. Critical Thinking, Human Behavior)
class Category(models.Model):
  name = models.CharField(max_length=25)
  color = models.CharField(max_length=25)
  def __str__(self):
    return '{}'.format(self.name)
  class Meta:
    verbose_name_plural = "Question Categories"


# Reading are set for each Category and Belt Level.
class Reading(models.Model):
  belt_level = models.ForeignKey(BeltLevel, on_delete=models.CASCADE)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)

  reading_text = models.TextField(max_length=600)

  # determines what reading is provided based on current belt level and user choice of category
  def which_reading(self):
    pass


  def __str__(self):
    return '{}, Category: {}, Reading: {}'.format(self.belt_level, self.category, self.reading_text)

# Question types available (ie. Multiple Choice, T/F)
class QuestionType(models.Model):
  name = models.CharField(max_length=25)
  def __str__(self):
    return '{}'.format(self.name)

# Generic question...paired with specific question types via FK 'qtype'
class Question(models.Model):
  belt_level = models.ForeignKey(BeltLevel, on_delete=models.CASCADE)
  category = models.ForeignKey(Category, on_delete=models.CASCADE)
  qtype = models.ForeignKey(QuestionType, on_delete=models.CASCADE)


  question_text = models.TextField(max_length=600)
  correct_response = models.TextField(max_length=300)
  incorrect_response = models.TextField(max_length=300)


  pub_date = models.DateTimeField('date published', default=datetime.now, blank=True, null=True)

  objects = QuestionManager()

  def __str__(self):
    return '{}: {}: {}'.format(self.qtype, self.belt_level, self.question_text)

  class Meta:
    verbose_name_plural = "All Questions"
    ordering = ['belt_level', 'category', 'qtype']


# QuestionTypes

class TrueFalse(Question):
  is_it_true = models.BooleanField(default=False)

  class Meta:
    verbose_name_plural = "True False Questions"


class MultipleChoice(Question):
  choice_1 = models.TextField(max_length=300)
  choice_2 = models.TextField(max_length=300)
  choice_3 = models.TextField(max_length=300)
  choice_4 = models.TextField(max_length=300)
  correct_answer = models.TextField(max_length=300, default='text')

  class Meta:
    verbose_name_plural = "Multiple Choice Questions"


class Ranking(Question):
  choice_1 = models.TextField(max_length=300)
  choice_2 = models.TextField(max_length=300)
  choice_3 = models.TextField(max_length=300)
  choice_4 = models.TextField(max_length=300)
  
  @property
  def correct_answer(self):
    return self.choice_1 + self.choice_2 + self.choice_3 + self.choice_4
    
  class Meta:
    verbose_name_plural = "Ranking Questions"

class Rating(Question):
  score = models.PositiveSmallIntegerField(null=True)

  class Meta:
    verbose_name_plural = "Rating Questions"

# User answers to questions












