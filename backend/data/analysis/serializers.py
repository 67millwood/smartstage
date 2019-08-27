from rest_framework import serializers 

class AccuracySerializer(serializers.Serializer):
    attempts = serializers.IntegerField(max_value=None, min_value=None)
    correct = serializers.IntegerField(max_value=None, min_value=None)
