from rest_framework import routers
from .api import UserAnswerViewSet

router = routers.DefaultRouter()
router.register('', UserAnswerViewSet, 'useranswer')

urlpatterns = [
  router.urls
  ]