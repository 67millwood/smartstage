from .base import *

import django_heroku


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

# Activate Django-Heroku.
django_heroku.settings(locals())

import dj_database_url
DATABASES['default'] = dj_database_url.config(conn_max_age=600, ssl_require=True)