from cuser.models import AbstractCUser
from django.db import models

# Create your models here.

class CustomUser(AbstractCUser):
  middle_name = models.CharField(('middle name'), max_length=150, blank=True)

