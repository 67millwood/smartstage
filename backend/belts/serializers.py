from rest_framework import serializers 
from .models import UserBelts, UserAnswer
from content.models import Question, MultipleChoice, TrueFalse, Ranking, Rating
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
    qtype_id = serializers.IntegerField(max_value=None, min_value=None)

    multipleChoiceAnswer = serializers.CharField(required=False, max_length=600)
    trueFalseAnswer = serializers.BooleanField(required=False)
    ratingAnswer = serializers.IntegerField(required=False, max_value=None, min_value=None)
    rankingAnswer = serializers.CharField(required=False, max_length=2000)
    

    def evaluate(self, validated_data, user):
        correct_feedback = Question.objects.values('correct_response').get(pk=validated_data['id'])
        incorrect_feedback = Question.objects.values('incorrect_response').get(pk=validated_data['id'])

        if validated_data['qtype_id'] == 1:
            answer = MultipleChoice.objects.get(pk=validated_data['id']).correct_answer
            if validated_data['multipleChoiceAnswer'] == answer:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=True)
                return correct_feedback
            else:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=False)
                return incorrect_feedback
        
        if validated_data['qtype_id'] == 2:
            answer = TrueFalse.objects.values('is_it_true').get(pk=validated_data['id'])
            if validated_data['trueFalseAnswer'] == answer['is_it_true']:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=True)
                return correct_feedback
            else:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=False)
                return incorrect_feedback

        if validated_data['qtype_id'] == 3:
            answer = Rating.objects.values('score').get(pk=validated_data['id'])
            if validated_data['ratingAnswer'] == answer['score']:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=True)
                return correct_feedback
            else:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=False)
                return incorrect_feedback

        if validated_data['qtype_id'] == 4:
            answer = Ranking.objects.get(pk=validated_data['id']).correct_answer
            if validated_data['rankingAnswer'] == answer:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=True)
                return correct_feedback
            else:
                UserAnswer.objects.create(user=user, question_id=validated_data['id'], correct=False)
                return incorrect_feedback

        

