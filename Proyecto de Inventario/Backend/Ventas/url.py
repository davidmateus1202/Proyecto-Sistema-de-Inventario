from django.urls import path
from .views import VentaView, detalle_venta


urlpatterns = [

    path('venta/', VentaView.as_view(), name='create_venta'),
    path('detalle_venta/<int:venta_id>/', detalle_venta, name='detalle_venta'),

]