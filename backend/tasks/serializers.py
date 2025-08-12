from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')  # or 'owner.id' if you prefer

    class Meta:
        model = Task
        fields = '__all__'
