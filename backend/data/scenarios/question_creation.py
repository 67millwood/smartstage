from content.models import Question
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
    question_id_list = []
    for question in question_ids:
      question_id_list.append(question['id'])
    shuffled_ids = random.sample(question_id_list, len(question_id_list))

    question_session = []
    for item in shuffled_ids:
      question_session.append(Question.objects.get(pk=item))

    return question_session[:4]


