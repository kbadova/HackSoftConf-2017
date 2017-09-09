from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import get_object_or_404
from ..serializers import BookingCreateSerializer
from ..services import create_booking
from ..models import Room, Tenant


class BookingRequestApi(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        room = get_object_or_404(Room, id=validated_data['room'])
        tenant = get_object_or_404(Tenant, id=validated_data['tenant'])

        booking = create_booking(room=room,
                                 tenants=tenant,
                                 start_date=validated_data['start_date'],
                                 end_date=validated_data['endt_date'])

        return Response({'booking_id': str(booking.id)}, status=status.HTTP_201_CREATED)
