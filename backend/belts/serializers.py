from rest_framework import serializers 
from .models import UserBelts, UserAnswer
from content.models import Question, TrueFalse
from content.models import BeltLevel
from users.serializers import CustomUserSerializer
from django.contrib.auth import authenticate

# User Serializer

class BeltLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = BeltLevel
        fields = ('__all__')

class UserBeltsSerializer(serializers.ModelSerializer):
    belt_level = BeltLevelSerializer()
    class Meta:
        model = UserBelts
        fields = ('__all__')

# Answer Serializer
class AnswerSerializer(serializers.Serializer):
    id = serializers.IntegerField(max_value=None, min_value=None)
    trueFalseAnswer = serializers.BooleanField(required=False)

    def fun(self, validated_data, user):
        print(user)
        print(validated_data['trueFalseAnswer'])
        print(validated_data['id'])
        print(TrueFalse.objects.values('is_it_true').get(pk=validated_data['id']))
        is_it_true = TrueFalse.objects.values('is_it_true').get(pk=validated_data['id'])
        print(is_it_true['is_it_true'])
        if validated_data['trueFalseAnswer'] == is_it_true['is_it_true']:
            UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=True)
        else:
            UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=False)


        


'''
need some version of this to create a correct or incorrect answer
    if response == 'true':
      UserAnswer.objects.create(user=request.user, question_id=question_id, correct=True)
    else:
      UserAnswer.objects.create(user=request.user, question_id=question_id, correct=False)
'''




