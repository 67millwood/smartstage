from belts.models import UserAnswer

from datetime import datetime, timezone, timedelta

def dailylimit (user):
    last_answer = UserAnswer.objects.latest('answer_date')
    now = datetime.now(timezone.utc)
    time_since_lastq = now - last_answer.answer_date 
    if (time_since_lastq < timedelta(seconds=180)):
        print('less than a 180 seconds')
    else:
        print('more than 3 minutes')
    print(time_since_lastq)
