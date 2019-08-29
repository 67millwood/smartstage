from datetime import date, timedelta

from belts.models import UserAnswer

def short_term(user):
    # set today and the start of the range
    seven_days_ago = date.today() - timedelta(7)
    today = date.today()
    interval = timedelta(days=1)
    question_dates = []
    
    # create the list of dates when questions were answered
    question_date = []
    real_questions = UserAnswer.objects.all().filter(answer_date__gt=seven_days_ago).filter(user=user)
    for question in real_questions:
        # need to convert datetime.datetime objects in database to .date()
        question_date.append(question.answer_date.date())
    print(seven_days_ago)
    print(question_date)
    # user the interval to count down the days individual between start date and today
    # check each date (converted to .date()) when a question was answered to see if occured on a day with no questions so far
    # add it to the collection of days and discard it from the original list
    # repeat until add days have been checked
    while seven_days_ago <= today:
        #print(seven_days_ago)
        for qdate in question_date:
            if qdate == seven_days_ago:
                if qdate not in question_dates:
                    question_dates.append(qdate)
                question_date.remove(qdate)
        seven_days_ago += interval
    
    # the number of unique dates is called hits....
    hits = len(question_dates)
    print('This many unique days in the p7:', hits)
    short_term_rating: ''
    # give a rating to the consistency over the past 7 days
    if hits <= 1:
        short_term_rating = 'Poor'
    elif hits <=2:
        short_term_rating = 'Moderate'
    elif hits <=3:
        short_term_rating = 'Good'
    elif hits <=4:
        short_term_rating = 'Great'
    else:
        short_term_rating = 'Amazing'
    
    return short_term_rating

def medium_term(user):
    today = date.today()
    thirty_days = today - timedelta(30)
    ten_days = today - timedelta(10)
    twenty_days = ten_days - timedelta(10)
    # print(today, ten_days, twenty_days, thirty_days)
    interval = timedelta(days=1)


    
    answers = UserAnswer.objects.all().filter(answer_date__gt=thirty_days).filter(user=user).count()
    return answers    

def long_term(user):
    ninety_days = date.today() - timedelta(90)
    today = date.today()

    answers = UserAnswer.objects.all().filter(answer_date__gt=ninety_days).filter(user=user).count()
    return answers