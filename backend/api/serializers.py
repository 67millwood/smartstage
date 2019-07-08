from rest_framework import serializers
from belts.models import UserAnswer

# UserAnswer serializer
class UserAnswerSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserAnswer
    fields = '__all__'
