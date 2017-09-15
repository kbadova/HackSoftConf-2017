from ..models import Room, Tenant, Booking


def create_booking(room: Room,
                   tenant: Tenant) -> Booking:
    booking = Booking.objects.create(room=room,
                                     tenant=tenant)
    return booking
