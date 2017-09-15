from datetime import datetime
from ..models import Room, Tenant, Booking


def create_booking(room: Room,
                   tenant: Tenant) -> Booking:
    booking = Booking.objects.create(room=room,
                                     tenant=tenant,
                                     start_date=datetime.now(),
                                     end_date=datetime.now())
    return booking
