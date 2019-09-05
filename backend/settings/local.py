from .base import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/


# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '0rm@@dbrhuv0m)=&%fxeb9_fybu392on)dfjbn!goc(!*tci+('

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'content2',
        'USER': 'kmcspurren',
        'PASSWORD': 'millwood',
        'HOST': 'localhost',
        'PORT': '',
    }
}
