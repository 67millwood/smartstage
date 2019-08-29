from datetime import date, timedelta

from belts.models import UserAnswer

def short_term(user):
    # set today and the start of the range
    seven_days = date.today() - timedelta(7)
    today = date.today()
    interval = timedelta(days=1)

    # jesus...it's one line....https://docs.djangoproject.com/en/2.2/ref/models/querysets/#dates
    last7days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__gt=seven_days).filter(user=user).count()
    
    print('This many unique days in the p7:', last7days)
    # give a rating to the consistency over the past 7 days
    short_term_rating: ''

    if last7days <= 1:
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
    print('last 10 days: ', last10days)
    
    last11to20days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__range=(twenty_days, ten_days)).filter(user=user).count()
    print('range 11 to 20 days ago: ', last11to20days)
    
    last21to30days = UserAnswer.objects.dates('answer_date', 'day').filter(answer_date__range=(thirty_days, twenty_days)).filter(user=user).count()
    print('21 to 30 days ago: ', last21to30days)
    
    total_unique_days = last10days + last11to20days + last21to30days
    print(total_unique_days)
    # give a rating to the consistency over the past 7 days
    medium_term_rating: ''

    if total_unique_days < 4:
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
    ninety_days = date.today() - timedelta(90)
    today = date.today()

    answers = UserAnswer.objects.all().filter(answer_date__gt=ninety_days).filter(user=user).count()
    return answers