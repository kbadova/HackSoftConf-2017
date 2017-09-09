from rest_framework import serializers
from ..models import Booking


class BookingCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = ('room', 'start_date', 'end_date', 'tenant')
