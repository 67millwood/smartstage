from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/


# SECURITY WARNING: keep the secret key used in production secret!
with open('./nocommitment/djangosecretkey.txt') as f:
    SECRET_KEY = f.read().strip()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []

with open('./nocommitment/localdbpwd.txt') as f:
    localdbpwd = f.read().strip()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'content2',
        'USER': 'kmcspurren',
        'PASSWORD': localdbpwd,
        'HOST': 'localhost',
        'PORT': '',
    }
}

SENDGRID_API_KEY = os.environ["SENDGRID_API_KEY"]
# change sandbox mode to True if you DON'T want to send emails
SENDGRID_SANDBOX_MODE_IN_DEBUG = False
EMAIL_BACKEND = "sendgrid_backend.SendgridBackend"