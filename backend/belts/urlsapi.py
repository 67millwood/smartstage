from rest_framework import routers
from .api import UserBeltViewSet

router = routers.DefaultRouter()
router.register('api/userbelts', UserBeltViewSet, 'firstuserbelts')

urlpatterns = router.urls
