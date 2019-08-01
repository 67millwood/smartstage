from django.db import models
from django.conf import settings
from content.models import *

from django.dispatch import receiver
from django.db.models.signals import post_save
from users.models import CustomUser
from content.models import Question

from .manager import BeltManager, UserAnswerManager

from datetime import datetime


# Create your models here.
class BeltApp(models.Model):
  pass

# User answers
class UserAnswer(models.Model):
  user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
  question = models.ForeignKey(Question, on_delete=models.CASCADE)
  answer_date = models.DateTimeField('date answered', default=datetime.now)
  correct = models.BooleanField('Were they correct?', default=False)

  # this method will add up correct answers/belt level to set a value of notches/level
  objects = UserAnswerManager()

  # provides readable string for the object
  def __str__(self):
    return '{}: {}'.format(self.user, self.correct)
  class Meta:
    verbose_name_plural = "User Answers"


# User Belts levels awarded
class UserBelts(models.Model):
  user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
  belt_level = models.ForeignKey(BeltLevel, on_delete=models.CASCADE)
  notches_complete = models.PositiveSmallIntegerField(null=True, default=0)
  percent_complete = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
  notches_override = models.PositiveSmallIntegerField(null=True, default=0)
  belt_complete_date = models.DateTimeField('Completion date:', blank=True, null=True)
  belt_complete = models.BooleanField('Belt complete?', default=False)

  # model manager
  objects = BeltManager()

# signal to listen for new users being created, adding a white belt to their profile
  @receiver(post_save, sender=CustomUser)
  def first_belt(sender, instance, **kwargs):
    if kwargs.get('created', False):
      UserBelts.objects.get_or_create(user_id=instance.id, belt_level_id=1)

# signal to listen for UserAnswer being created, updates the belt level accordingly
  @receiver(post_save, sender=UserAnswer)
  def update_belts_with_answers(sender, instance, **kwargs):
    if kwargs.get('created'):
      the_belt = Question.objects.filter(pk=instance.question_id).values('belt_level_id')
      update_this_belt = the_belt[0]['belt_level_id']

      userbelt_id = UserBelts.objects.filter(user=instance.user_id, belt_level=update_this_belt).values()
      #print('userbelt specific id: ' + str(userbelt_id[0]['id']))
      #print('notches for this belt : ' + str(userbelt_id[0]['notches_complete']))
      correct_answers_for_belt = UserAnswer.objects.filter(user=instance.user_id, question__belt_level=update_this_belt, correct=True).count()
      #print('correct answers at this belt level: ' + str(correct_answers_for_belt))
      #print('notches override: ' + str(userbelt_id[0]['notches_override']))

      updated_belt_notches = UserBelts.objects.get(id=userbelt_id[0]['id'])
      print(updated_belt_notches.notches_override)
      updated_belt_notches.notches_complete = correct_answers_for_belt + updated_belt_notches.notches_override
      updated_belt_notches.save()
  '''
  # method to set notches to correct answers @ belt level AND allow override via admin tool
  def notches_in_belt(self):
    correct_answers = UserAnswer.objects.filter(user=self.user, question__belt_level=self.belt_level, correct=True).count()
    if self.notches_override:
      self.notches_complete = self.notches_override
    else:
      self.notches_complete = correct_answers
    self.save()
    return self.notches_complete
  '''
  def __str__(self):
    return '{}: {}: {} notches complete.'.format(self.user, self.belt_level, self.notches_complete)

# Create signal to calculate % of Userbelt complete and  if belt is complete
@receiver(post_save, sender=UserBelts)
def is_complete(sender, instance, **kwargs):
  instance.percent_complete = round(100 * instance.notches_complete / instance.belt_level.belt_notches, 1)
  # mark userbelt complete if enough notches
  if instance.percent_complete >= 100:
    instance.belt_complete = True
    instance.belt_complete_date = datetime.now()
    UserBelts.objects.get_or_create(user_id=instance.user_id, belt_level_id=(1 + instance.belt_level_id))
  # revert to not complete and no completion date (if admin wipes notches)
  else:
    instance.belt_complete = False
    instance.belt_complete_date = None
  post_save.disconnect(is_complete, sender=UserBelts)
  instance.save()
  post_save.connect(is_complete, sender=UserBelts)






