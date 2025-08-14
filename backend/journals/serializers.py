from rest_framework import serializers
from .models import Journal

class JournalSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Journal
        fields = "__all__"
