from mongoengine import Document, StringField, DateTimeField, IntField, BooleanField, EmailField

class Event(Document):
    name = StringField(required=True)
    description = StringField()
    dateForm = DateTimeField()
    hour = StringField()
    location = StringField()
    address = StringField()
    organizer = StringField()
    email = EmailField()
    phone = StringField()
    category = StringField()
    capacity = IntField()
    freeState = BooleanField(default=False)
    outstanding = BooleanField(default=False)
    created_at = DateTimeField()
