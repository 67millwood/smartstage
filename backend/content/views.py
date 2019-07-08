from django.shortcuts import render, redirect
from django.http import HttpResponse
from users.forms import CustomUserCreationForm
import random
from .models import *
from belts.models import *

from forms.forms import UserAnswerForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, FormView, TemplateView
from django.views.generic.base import View
from django.db.models import Max

from data.scenarios.question_creation import question_set

# Create your views here.

# /content homepage...placeholder
@login_required
def index(request):
  return render(request, 'content/index.html')

def home(request):
  return render(request, 'content/home.html')

def test_area(request):
  return render(request, 'testarea.html')

# user selects a Category for questions and it is stored as a session cookie
def starting_point(request):
  if request.method == 'POST':
    post = request.POST
    request.session['category'] = post.get('category')
    return redirect('/content/start/myquestions')

  return render(request, 'content/start.html')


def register(request):
  if request.method =='POST':
    form = CustomUserCreationForm(request.POST)
    if form.is_valid():
      form.save()
      return redirect('/')
    else:
      print(form.errors.as_json())
      return HttpResponse('Not Valid')

  else:
    form = CustomUserCreationForm()
    args = {'form': form}
    return render(request, 'registration/reg_form.html', args)

class UserBeltPage(LoginRequiredMixin, View):

  def get(self, request):
    belt_info = UserBelts.objects.all_belts(user=self.request.user)
    context = {
      'belt_list': belt_info['belts'],
      'highest_belt_name': belt_info['highest_belt_name'],
      }
    return render(request, 'content/userbelts.html', context=context)

class MyQuestions(LoginRequiredMixin, View):
  def get(self, request):
    questions = question_set(user=self.request.user, category=request.session.get('category', 1))

    # should probably push this into the question creation file later if possible
    session_questions = []
    for question in questions:
      if question.qtype_id == 1:
        answer = MultipleChoice.objects.get(pk=question.id)
      elif question.qtype_id == 2:
        answer = TrueFalse.objects.get(pk=question.id)
      elif question.qtype_id == 3:
        answer = Rating.objects.get(pk=question.id)
      else:
        answer = Ranking.objects.get(pk=question.id)
      session_questions.append([question, answer])

    # sends 4 questions in random order to the page
    context = {
    'session_questions': session_questions,
    }

    return render(request, 'content/userquestion.html', context)
"""
  def post(self, request):
    form = request.POST
    response = form.get('choice')
    answered_question_id = form.get('questionid')
    correct = form.get('correct')
    if response == correct:
      UserAnswer.objects.create(user=request.user, question_id=answered_question_id, correct=True)
    else:
      UserAnswer.objects.create(user=request.user, question_id=answered_question_id, correct=False)
    return redirect('/content/start/myquestions/')
"""
def create_post(request):
  if request.method == 'POST':
    question_id = request.POST.get('q_id')
    response = request.POST.get('user_correct')
    response_data = {}

    if response == 'true':
      UserAnswer.objects.create(user=request.user, question_id=question_id, correct=True)
    else:
      UserAnswer.objects.create(user=request.user, question_id=question_id, correct=False)

    response_data['result'] = 'Post worked!! Django response.'

    return HttpResponse()

"""
  def post(self, request):

    form = UserAnswerForm(request.POST)

    if form.is_valid():
      post = form.save(commit=False)
      post.user = request.user
      post.question_id = next_question.id
      post.save()
      return redirect('/')

    args = {'form': form, 'user_answer': user_answer}
    return render(request, self.template_name, args)
"""
# testing...not important
