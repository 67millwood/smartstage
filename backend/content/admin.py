from django.contrib import admin
from cuser.admin import UserAdmin
from .models import *
from belts.models import *
from analysis.models import *

from users.forms import CustomUserCreationForm, CustomUserChangeForm
from users.models import CustomUser


admin.site.site_header = 'Smrtr.life'

class CustomUserAdmin(UserAdmin):

  fieldsets = (
        (('The import info'), {'fields': ('email', 'password')}),
        (('Personal info'), {'fields': ('first_name', 'last_name', 'middle_name')}),
        (('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

  add_form = CustomUserCreationForm
  form = CustomUserChangeForm
  model = CustomUser
  list_display = ('email', 'first_name', 'middle_name', 'is_staff')

# Register your models here.
admin.site.register([
  Category,
  QuestionType,
  BeltLevel,
  Question,
  TrueFalse,
  MultipleChoice,
  Ranking,
  Rating,
  UserAnswer,
  UserBelts,
  Reading,
  BeltApp,
  OverallScore,
  ])

admin.site.register(CustomUser, CustomUserAdmin)







