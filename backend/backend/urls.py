"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from cuser.forms import AuthenticationForm
from django.urls import path, include
from django.contrib.auth.views import LoginView
from django.views.generic import TemplateView

from content import views
from api.urls import router


urlpatterns = [
    path('content/', include('content.urls')),
    path('admin/', admin.site.urls),
    #path('api/', include(router.urls)),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/login', LoginView.as_view(authentication_form=AuthenticationForm), name='login'),
    path('register/', views.register, name='register'),
    path('', views.home, name='home'),
    path('testarea/', views.test_area, name='test_area'),
    path('answers/', views.create_post, name='create_post'),
    # for the belts app
    path('belts/', include('belts.urls')),

    # for the analysis app
    path('analysis/', include('analysis.urls')),

    # for the user api
    path('', include('users.urls')),

]
