from .base import *

import django_heroku

# SECURITY WARNING: keep the secret key used in production secret!
with open('./nocommitment/djangosecretkey.txt') as f:
    SECRET_KEY = f.read().strip()

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# for HEROKU deployment
with open('./nocommitment/developmentdbpwd.txt') as f:
    devdbpwd = f.read().strip()


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'd1d67qs6opc0oa',
        'USER': 'vfggzquhdqzmzb',
        'PASSWORD': devdbpwd,
        'HOST': 'ec2-54-235-92-244.compute-1.amazonaws.com',
        'PORT': '5432',
    }
}

# Activate Django-Heroku.
django_heroku.settings(locals())

import dj_database_url
DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)