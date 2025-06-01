from rest_framework import viewsets, status
from rest_framework.response import Response
from django.conf import settings
from bson import ObjectId
from bson.errors import InvalidId
from core.mongo import client
import environ


env = environ.Env(
    DEBUG=(bool, False)  
)

database = env('MONGODB_NAME')
table = env('MONGODB_TABLE')

class EventViewSet(viewsets.ViewSet):
    @property
    def collection(self):
        # Cambia 'your_database_name' y 'events' por tus nombres reales
        return client[f'{database}'][f'{table}']

    def list(self, request):
        events_cursor = self.collection.find()
        events = []
        for event in events_cursor:
            event['id'] = str(event['_id'])
            del event['_id']
            events.append(event)
        return Response(events)

    def create(self, request):
        data = request.data.copy()
        # No permitimos 'id' al crear
        data.pop('id', None)
        insert_result = self.collection.insert_one(data)
        new_event = self.collection.find_one({"_id": insert_result.inserted_id})
        new_event['id'] = str(new_event['_id'])
        del new_event['_id']
        return Response(new_event, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        try:
            obj_id = ObjectId(pk)
        except InvalidId:
            return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

        event = self.collection.find_one({"_id": obj_id})
        if not event:
            return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        event['id'] = str(event['_id'])
        del event['_id']
        return Response(event)

    def update(self, request, pk=None):
        try:
            obj_id = ObjectId(pk)
        except InvalidId:
            return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data.pop('id', None)
        result = self.collection.update_one({"_id": obj_id}, {"$set": data})
        if result.matched_count == 0:
            return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        event = self.collection.find_one({"_id": obj_id})
        event['id'] = str(event['_id'])
        del event['_id']
        return Response(event)

    def destroy(self, request, pk=None):
        try:
            obj_id = ObjectId(pk)
        except InvalidId:
            return Response({'error': 'ID inválido'}, status=status.HTTP_400_BAD_REQUEST)

        result = self.collection.delete_one({"_id": obj_id})
        if result.deleted_count == 0:
            return Response({'error': 'Evento no encontrado'}, status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_204_NO_CONTENT)
