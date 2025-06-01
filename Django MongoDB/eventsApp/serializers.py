from rest_framework import serializers

class EventSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=False, allow_blank=True)
    dateForm = serializers.DateTimeField(required=False)
    hour = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    address = serializers.CharField(required=False, allow_blank=True)
    organizer = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    phone = serializers.CharField(required=False, allow_blank=True)
    category = serializers.CharField(required=False, allow_blank=True)
    capacity = serializers.IntegerField(required=False)
    freeState = serializers.BooleanField(required=False)
    outstanding = serializers.BooleanField(required=False)
    created_at = serializers.DateTimeField(required=False)
