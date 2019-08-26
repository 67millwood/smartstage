from cuser.models import AbstractCUser
from django.db import models

# Create your models here.

class CustomUser(AbstractCUser):
  middle_name = models.CharField(('middle name'), max_length=150, blank=True)

'''
this is about resetting pwd via email
it had to be put somewhere where it would be executed
put it in Users models.py because there was not much else there
'''

from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse

from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    """
    Handles password reset tokens
    When a token is created, an e-mail needs to be sent to the user
    :param sender: View Class that sent the signal
    :param instance: View Instance that sent the signal
    :param reset_password_token: Token Model Object
    :param args:
    :param kwargs:
    :return:
    """
    # send an e-mail to the user
    print('the password email')
    context = {
        'email': reset_password_token.user.email,
        'reset_password_url': "http://localhost:8080{}?token={}".format(reverse('password_reset:reset-password-request'), reset_password_token.key)
    }

    # render email text
    # there is no html email as of yet...just plain text
    # email_html_message = render_to_string('email/user_reset_password.html', context)
    email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Smrtr.life"),
        # message:
        email_plaintext_message,
        # from:
        "info@smrtr.life",
        # to:
        [reset_password_token.user.email]
    )
    #msg.attach_alternative(email_html_message, "text/html")
    msg.send()