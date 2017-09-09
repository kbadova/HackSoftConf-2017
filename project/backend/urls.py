from django.conf.urls import url
from django.views.generic import TemplateView

from .apis.bookings import BookingCreateApi


urlpatterns = [
    url(
        regex=r'^form/$',
        view=TemplateView.as_view(template_name='booking_create.html'),
        name='booking-form'
    ),
    url(
        regex=r'^create/$',
        view=BookingCreateApi.as_view(),
        name='booking-create'
    ),
]
