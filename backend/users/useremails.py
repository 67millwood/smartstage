from django.core.mail import send_mail
from django.http import HttpResponse

def userSignUp(emailto):
   send_mail("Thanks for signing up!", "Welcome...", "info@smrtr.life", [emailto])
   # return HttpResponse('%s'%res)