from django.core.mail import send_mail
from django.http import HttpResponse

def completedBeltEmail(emailto, belt):
   send_mail("You\'ve earned a new belt! 🐼", "The color of the belt is: " + belt, "info@smrtr.life", [emailto])
   # return HttpResponse('%s'%res)