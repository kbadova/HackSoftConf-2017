from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers.input import BookingCreateSerializer
from ..services.bookings import create_booking


class BookingCreateApi(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        booking = create_booking(room=validated_data['room'],
                                 tenant=validated_data['tenant'])

        return Response({'booking_id': str(booking.id)}, status=status.HTTP_201_CREATED)
