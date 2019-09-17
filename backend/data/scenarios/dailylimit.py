from belts.models import UserAnswer

from datetime import datetime, timezone, timedelta

def dailylimit (user):
    last_answer = UserAnswer.objects.latest('answer_date')
    last_answer_time = last_answer.answer_date
    now = datetime.now(timezone.utc)
    
    three_min_ago = now - timedelta(seconds=180)
    print(three_min_ago)
    q_in_last_three_minutes = UserAnswer.objects.filter(answer_date__gt=three_min_ago).count()
    print(q_in_last_three_minutes)
    if q_in_last_three_minutes >= 4:
        time_lock = True
        time_unlock = last_answer_time + timedelta(days=0.5)
        time_next = time_unlock.strftime("%A, %I:%M %p")
        print(time_next)

    time_since_lastq = now - last_answer.answer_date 
    print(time_since_lastq)
