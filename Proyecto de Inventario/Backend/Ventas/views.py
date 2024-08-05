from django.shortcuts import render
from .serializador import VentaSerializer, DetalleVentaSerializer
from .models import Venta, DetalleVenta
from Productos.models import Producto
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view


class VentaView(generics.CreateAPIView):
    serializer_class = VentaSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        return Venta.objects.filter(user=user)
    
    def perform_create(self, serializer):
        
        if serializer.is_valid():
            serializer.save(user=self.request.user)
            return Response(serializer.data)
        else:
            return serializer.errors
        
@api_view(['POST'])
def detalle_venta(request, venta_id):

    try:
        venta = Venta.objects.get(id=venta_id)
        data = request.data
        data['venta'] = venta.id
        serializer = DetalleVentaSerializer(data=data)
        if serializer.is_valid():
            detalle_venta = serializer.save()

            producto = Producto.objects.get(id = detalle_venta.producto.id)

            if detalle_venta.cantidad > producto.unidades:
                return Response({'error': 'No hay suficientes unidades en stock'})
            elif detalle_venta.cantidad <= producto.unidades:
                
                producto.unidades -= detalle_venta.cantidad
                print(producto.unidades)
                producto.save()
                return Response(serializer.data, status=201,)
        else:
            return Response({'error': 'No se pudo crear el detalle de la venta'})

    except:
        pass
