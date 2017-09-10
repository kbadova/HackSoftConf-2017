from rest_framework import serializers
from ..models import Room, Tenant


class RoomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'room_number', 'floor')


class TenantListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = ('id', 'name', 'email', 'nationality', 'birthday', 'gender')
