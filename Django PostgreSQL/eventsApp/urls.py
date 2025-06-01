from django.urls import path
from .views import EventsList, EventDetail


urlpatterns = [
    path('registers', EventsList.as_view(), name='events-list'),
    path('registers/<int:pk>', EventDetail.as_view(), name='event-detail'),
]
