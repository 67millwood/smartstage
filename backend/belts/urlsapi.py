from django.urls import path

from rest_framework import routers
from .api import UserBeltViewSet, SingleUserBeltViewSet

router = routers.DefaultRouter()
router.register('api/userbelts', UserBeltViewSet, 'firstuserbelts')

urlpatterns = [
    path('api/singleuserbelts', SingleUserBeltViewSet.as_view())
]

urlpatterns += router.urls
