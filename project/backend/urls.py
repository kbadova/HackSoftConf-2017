from django.conf.urls import url
from django.views.generic import TemplateView

from .apis.bookings import BookingCreateApi
from .apis.rooms import RoomListApi


urlpatterns = [
    url(
        regex=r'^booking/form/$',
        view=TemplateView.as_view(template_name='booking_create.html'),
        name='booking-form'
    ),
    url(
        regex=r'^booking/create/$',
        view=BookingCreateApi.as_view(),
        name='booking-create'
    ),
    url(
        regex=r'^rooms/$',
        view=RoomListApi.as_view(),
        name='rooms'
    ),
]
