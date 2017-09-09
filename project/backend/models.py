from django.db import models


class Tenant(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField()
    nationality = models.CharField(max_length=200, blank=True)
    birthday = models.DateField()
    gender = models.CharField(max_length=200, blank=True, null=True)


class Room(models.Model):
    room_number = models.CharField(max_length=5)
    floor = models.IntegerField()


class Booking(models.Model):
    # location = models.ForeignKey(Location, related_name='bookings', on_delete=models.CASCADE)
    tenant = models.ForeignKey(Tenant, related_name='bookings')

    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    room = models.ForeignKey(Room)
