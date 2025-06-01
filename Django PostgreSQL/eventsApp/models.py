from django.db import models

# Create your models here.

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    dateForm = models.DateField()
    hour = models.TimeField()
    location = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    organizer = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    category = models.CharField(max_length=100)
    capacity = models.IntegerField()
    freeState = models.BooleanField(default=False)
    outstanding = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name