from content.models import Question, MultipleChoice, TrueFalse, Rating, Ranking
from belts.models import UserAnswer, UserBelts


def accuracy(user):
    # all available questions for specific user at their highest belt level
    answers = UserAnswer.objects.all_attempts(user=user)

    attempts = 6
    correct = 7
    print(attempts)

    return correct


