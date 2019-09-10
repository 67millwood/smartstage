from cuser.models import AbstractCUser
from django.db import models

# Create your models here.

class CustomUser(AbstractCUser):
  middle_name = models.CharField(('middle name'), max_length=150, blank=True)

'''
this is about resetting pwd via email
it had to be put somewhere where it would be executed
put it in Users models.py because there was not much else there
'''

from django.dispatch import receiver
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created
from .useremails import resetPwd


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    resetPwd(reset_password_token.user.email, reset_password_token.key)