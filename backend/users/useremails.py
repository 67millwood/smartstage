from django.core.mail import send_mail
from django.http import HttpResponse

import sendgrid
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def userSignUp(emailto):
   send_mail("Thanks for signing up!", "Welcome...", "info@smrtr.life", [emailto])
   # return HttpResponse('%s'%res)

def sendGridmailer(user):
   message = Mail(
      from_email='info@smrtr.life',
      to_emails='info@track2development.com',
      subject='Makin it rain $$$',
      html_content='<strong>boom</strong>')
   try:
      # sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
      sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))

      response = sg.send(message)
      print(response.status_code)
      print(response.body)
      print(response.headers)
   except Exception as e:
      print(str(e))