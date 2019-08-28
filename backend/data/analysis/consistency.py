from datetime import date, timedelta

from belts.models import UserAnswer

def short_term(user):
    seven_days_ago = date.today() - timedelta(7)
    today = date.today()
    question_date = [date(2019, 8, 23), date(2019, 8, 24), date(2019, 8, 24), date(2019, 7, 30)]
    interval = timedelta(days=1)
    question_dates = []
    while seven_days_ago <= today:
        #print(seven_days_ago)
        for qdate in question_date:
            if qdate == seven_days_ago:
                #print('yes')
                if qdate not in question_dates:
                    question_dates.append(qdate)
                question_date.remove(qdate)
        seven_days_ago += interval
    hits = len(question_dates)
    #unqiue_question_dates = set(question_dates)
    print('this many unique days in the p7:', hits)
    print('Today: ', today)
    print('7 days ago: ', seven_days_ago)
    return 'short'

def medium_term(user):
    answers = UserAnswer.objects.all().count()
    return answers    

def long_term(user):
    print('hello long term')
    return 'long'