from datetime import date, timedelta

from belts.models import UserAnswer

def short_term(user):
    # set today and the start of the range
    seven_days = date.today() - timedelta(7)
    today = date.today()
    interval = timedelta(days=1)

    # jesus...it's one line....https://docs.djangoproject.com/en/2.2/ref/models/querysets/#dates
    last7days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__gt=seven_days).filter(user=user).count()
    
    # need to determine if the first question answered is LATER than the time period
    # if NOT, message to user is 'not enough data yet'
    first_question = UserAnswer.objects.all().filter(user=user).first()

    # give a rating to the consistency over the past 7 days
    short_term_rating: ''
    if first_question == None:
        short_term_rating = 'No questions answered yet...'
    elif first_question.answer_date.date() > seven_days:
        short_term_rating = 'Need a bit more time...'
    elif last7days <= 1:
        short_term_rating = 'Poor'
    elif last7days <=2:
        short_term_rating = 'Moderate'
    elif last7days <=3:
        short_term_rating = 'Good'
    elif last7days <=4:
        short_term_rating = 'Great'
    else:
        short_term_rating = 'Amazing'
    
    return short_term_rating

def medium_term(user):
    today = date.today()
    ten_days = today - timedelta(10)
    twenty_days = today - timedelta(20)
    thirty_days = today - timedelta(30)

    last10days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__gt=ten_days).filter(user=user).count()
    
    last11to20days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__range=(twenty_days, ten_days)).filter(user=user).count()
    
    last21to30days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__range=(thirty_days, twenty_days)).filter(user=user).count()
    
    total_unique_days = last10days + last11to20days + last21to30days
    
    # need to determine if the first question answered is LATER than the time period
    # if NOT, message to user is 'not enough data yet'
    first_question = UserAnswer.objects.all().filter(user=user).first()

    # give a rating to the consistency over the past 7 days
    medium_term_rating: ''
    if first_question == None:
        medium_term_rating = 'No questions answered yet...'
    elif first_question.answer_date.date() > thirty_days:
        medium_term_rating = 'Need a bit more time...'
    elif total_unique_days < 4:
        medium_term_rating = 'Poor'
    elif total_unique_days < 7:
        if last10days >= 1 and last11to20days >= 1 and last21to30days >= 1:
            medium_term_rating = 'Moderate'
        else:
            medium_term_rating = 'Poor'
    elif total_unique_days < 10:
        if last10days >= 2 and last11to20days >= 2 and last21to30days >= 2:
            medium_term_rating = 'Good'
        else:
            medium_term_rating = 'Moderate'
    elif total_unique_days < 13:
        if last10days >= 3 and last11to20days >= 3 and last21to30days >= 3:
            medium_term_rating = 'Great'
        else:
            medium_term_rating = 'Good'
    elif total_unique_days >= 13:
        if last10days >= 4 and last11to20days >= 4 and last21to30days >= 4:
            medium_term_rating = 'Amazing'
        else:
            medium_term_rating = 'Great'


    return medium_term_rating    

def long_term(user):
    today = date.today()
    thirty_days = today - timedelta(30)
    sixty_days = today - timedelta(60)
    ninety_days = today - timedelta(90)


    last30days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__gt=thirty_days).filter(user=user).count()
    
    last31to60days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__range=(sixty_days, thirty_days)).filter(user=user).count()
    
    last61to90days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__range=(ninety_days, sixty_days)).filter(user=user).count()
    
    total_unique_days = last30days + last31to60days + last61to90days
    
    # need to determine if the first question answered is LATER than the time period
    # if NOT, message to user is 'not enough data yet'
    first_question = UserAnswer.objects.all().filter(user=user).first()

    # give a rating to the consistency over the past 7 days
    long_term_rating: ''
    if first_question == None:
        long_term_rating = 'No questions answered yet...'
    elif first_question.answer_date.date() > ninety_days:
        long_term_rating = 'Need a bit more time...'
    elif total_unique_days < 12:
        long_term_rating = 'Poor'
    elif total_unique_days < 19:
        if last30days >= 3 and last31to60days >= 3 and last61to90days >= 3:
            long_term_rating = 'Moderate'
        else:
            long_term_rating = 'Poor'
    elif total_unique_days < 28:
        if last30days >= 6 and last31to60days >= 6 and last61to90days >= 6:
            long_term_rating = 'Good'
        else:
            long_term_rating = 'Moderate'
    elif total_unique_days < 37:
        if last30days >= 9 and last31to60days >= 9 and last61to90days >= 9:
            long_term_rating = 'Great'
        else:
            long_term_rating = 'Good'
    elif total_unique_days >= 37:
        if last30days >= 12 and last31to60days >= 12 and last61to90days >= 12:
            long_term_rating = 'Amazing'
        else:
            long_term_rating = 'Great'


    return long_term_rating    
