from django.core.mail import send_mail
from django.http import HttpResponse

import sendgrid
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

import json

def userSignUp(emailto):
   send_mail("Thanks for signing up!", "Welcome...", "info@smrtr.life", [emailto])
   # return HttpResponse('%s'%res)

def sendGridmailer(user):
   name = str(user)
   print(name)
   sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))

   data = {
      "personalizations": [
         {
            "to": [
            {
               "email": "info@track2development.com"
            }
            ],
               "subject": "Thank you for registering"
            }
         ],
         "from": {
            "email": "info@smrtr.life"
         },
         "content": [
            {
               "type": "text/plain",
               "value": name
            }
         ]
   }
   response = sg.client.mail.send.post(request_body=data)
   print(response.status_code)
   print(response.body)
   print(response.headers)
