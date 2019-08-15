from django.core.mail import send_mail
from django.http import HttpResponse

def completedBeltEmail(emailto):
   res = send_mail("hello ", "You\'ve earned a new belt! 🐼", "info@smrtr.life", [emailto])
   # return HttpResponse('%s'%res)