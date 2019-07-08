from django import forms
from django.forms import ModelForm
from belts.models import UserAnswer

class UserAnswerForm(ModelForm):
  class Meta:
    model = UserAnswer
    fields = []
