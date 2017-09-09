from rest_framework.views import APIView
from ..serializers import BookingCreateSerializer

class BookingRequestApi(APIView):
    def post(self, request, *args, **kwargs):
        serializer = BookingCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        room_type = get_object_or_404(RoomType, ref=validated_data['room_type'])

        booking = request_booking(room_type=room_type,
                                  tenants_data=validated_data['tenants'],
                                  offer_code=validated_data['offer_code'],
                                  requested_end_date=validated_data['requested_end_date'],
                                  requested_start_date=validated_data['requested_start_date'])

        return Response({'booking_id': str(booking.public_id)}, status=status.HTTP_201_CREATED)
