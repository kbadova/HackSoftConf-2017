from datetime import datetime
from ..models import Room, Tenant, Booking


def create_booking(room: Room,
                   tenant: Tenant,
                   start_date: datetime,
                   end_date: datetime) -> Booking:
    booking = Booking.objects.create(room=room,
                                     tenant=tenant,
                                     start_date=start_date,
                                     end_dat=end_date)
    return booking
