from belts.models import UserAnswer

from datetime import datetime, timezone, timedelta
import time

'''
this function counts how many questions have been attempted in the last time period
defined by time_gap. An 'unlock' time is created in seconds and passed to the api which 
is then called by the app on the Home page to show the normal carosel of questions or 
a message with a countdown clock
'''
def dailylimit (user):
    last_answer = UserAnswer.objects.latest('answer_date')
    last_answer_time = last_answer.answer_date
    now = datetime.now(timezone.utc)
    
    time_gap = now - timedelta(seconds=120)
    # print(time_gap)
    q_in_last_three_minutes = UserAnswer.objects.filter(answer_date__gt=time_gap).count()
    # print(q_in_last_three_minutes)
    if q_in_last_three_minutes >= 2:
        time_unlock = last_answer_time + timedelta(days=0.5) - now
        #time_next = time_unlock.strftime("%A, %I:%M %p")
        for_api = time_unlock.seconds
        appdelay = str(time_unlock)
        # print(appdelay)
        return {'appdelay': for_api}
