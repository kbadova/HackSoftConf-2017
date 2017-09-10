from rest_framework.generics import ListAPIView
from ..serializers.output import RoomListSerializer
from ..models import Room


class RoomListApi(ListAPIView):
    serializer_class = RoomListSerializer

    def get_queryset(self):
        return Room.objects.all()

