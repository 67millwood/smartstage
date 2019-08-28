
from belts.models import UserAnswer

def short_term(user):
    print('hello short term')
    return 'short'

def medium_term(user):
    answers = UserAnswer.objects.all().count()
    return answers    

def long_term(user):
    print('hello long term')
    return 'long'