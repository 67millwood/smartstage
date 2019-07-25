from content.models import Question, MultipleChoice, TrueFalse, Rating, Ranking
from belts.models import UserAnswer, UserBelts
#from content.views import starting_point
import random

def question_set(user, category):
    # all available questions for specific user at their highest belt level
    belts = UserBelts.objects.all_belts(user=user)

    user_questions = Question.objects.one_level_questions(category, belts['highest_belt_level'])
        
    custom_question_query = user_questions['result']
    # previously answered questions that were correct=True
    answered = UserAnswer.objects.all_attempts(user=user)
    custom_answer_query = answered['correct_answers']

    # create a subset of all available questions for that belt level MINUS all correctly answered questions
    question_ids = custom_question_query.values('id').difference(custom_answer_query.values('question_id'))
    #print(question_ids)
    question_id_list = []
    for question in question_ids:
      question_id_list.append(question['id'])
    shuffled_ids = random.sample(question_id_list, len(question_id_list))
    #print(shuffled_ids)
    
    web_questions = []
    question_session = []
    for item in shuffled_ids:
      try:
        nice = MultipleChoice.objects.get(pk=item)
        question_session.append(nice)
      except:
        print('not')
      try:
        nice = TrueFalse.objects.get(pk=item)
        question_session.append(nice)
      except:
        print('not')
      try:
        nice = Rating.objects.get(pk=item)
        question_session.append(nice)
      except:
        print('not')
      try:
        nice = Ranking.objects.get(pk=item)
        question_session.append(nice)
      except:
        print('not')
 
      web_questions.append(Question.objects.get(pk=item))
    print(question_session)
    #for item in shuffled_ids:


    #print(question_session[:4])
    return web_questions[:4]

def app_question_set(user, category):
    # all available questions for specific user at their highest belt level
    belts = UserBelts.objects.all_belts(user=user)

    user_questions = Question.objects.one_level_questions(category, belts['highest_belt_level'])
        
    custom_question_query = user_questions['result']
    # previously answered questions that were correct=True
    answered = UserAnswer.objects.all_attempts(user=user)
    custom_answer_query = answered['correct_answers']

    # create a subset of all available questions for that belt level MINUS all correctly answered questions
    question_ids = custom_question_query.values('id').difference(custom_answer_query.values('question_id'))

    question_id_list = []
    for question in question_ids:
      question_id_list.append(question['id'])
    shuffled_ids = random.sample(question_id_list, len(question_id_list))
    
    print(custom_question_query)
    
    return custom_question_query

