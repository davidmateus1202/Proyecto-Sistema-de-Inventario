from django.urls import path
from .views import VentaView, detalle_venta, create_factura_pdf


urlpatterns = [

    path('venta/', VentaView.as_view(), name='create_venta'),
    path('detalle_venta/<int:venta_id>/', detalle_venta, name='detalle_venta'),
    path('create_factura_pdf/<int:venta_id>/', create_factura_pdf, name='create_factura_pdf'),

]