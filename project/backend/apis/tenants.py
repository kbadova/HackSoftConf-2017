from rest_framework.generics import ListAPIView
from ..serializers.output import TenantListSerializer
from ..models import Tenant
from ..filters import TenantFilter


class TenantListApi(ListAPIView):
    serializer_class = TenantListSerializer
    filter_claass = TenantFilter

    def get_queryset(self):
        return Tenant.objects.all()
