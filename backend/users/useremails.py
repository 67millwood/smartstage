from django.http import HttpResponse

import sendgrid
import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

import json

# registration email
def registration_email(user):
   name = str(user)
   sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))

   data = {
      "personalizations": [
         {
            "to": [
            {
               "email": "info@track2development.com"
            }
            ],
             "dynamic_template_data": {
               "username": name,
            },
               "subject": "Thank you for registering SIR"
            }
         ],
         "from": {
            "email": "info@smrtr.life"
         },
         "template_id":"d-7765e50a92c34a3a8e160fba57d78425"
   }
   response = sg.client.mail.send.post(request_body=data)
   print(response.status_code)
   print(response.body)
   print(response.headers)

# password reset email
def resetPwd(email, new_token):
   user = str(email)
   token = str(new_token)
   sg = SendGridAPIClient(os.getenv('SENDGRID_API_KEY'))

   data = {
      "personalizations": [
         {
            "to": [
            {
               "email": user
            }
            ],
             "dynamic_template_data": {
               "token": token,
               "user": user,
            },
               "subject": "Thank you for registering SIR"
            }
         ],
         "from": {
            "email": "info@smrtr.life"
         },
         "template_id":"d-2d1c6725aa34497e8056d733f552f1da"
   }
   response = sg.client.mail.send.post(request_body=data)
   print(response.status_code)
   print(response.body)
   print(response.headers)
