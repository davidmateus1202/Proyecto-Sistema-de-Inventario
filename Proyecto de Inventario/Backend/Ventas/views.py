from django.shortcuts import render
from .serializador import VentaSerializer, DetalleVentaSerializer
from .models import Venta, DetalleVenta
from Productos.models import Producto
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view

# import for create pdf

import fitz
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
import io



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
        return Response({'error': 'No se pudo encontrar la venta'})



def create_factura_pdf(request, venta_id):
    try:
        # Obtén los datos de la venta
        venta = get_object_or_404(Venta, pk=venta_id)
        detalles_venta = DetalleVenta.objects.filter(venta=venta)

        # Abre el archivo de plantilla PDF
        template_path = 'C:/Proyectos/Proyecto de Inventario/Backend/Factura.pdf'
        pdf_document = fitz.open(template_path)

        # Selecciona la primera página del documento
        page = pdf_document[0]

        # Añadir datos dinámicos al PDF
        page.insert_text((456, 668), f"{venta.id}", fontsize=12)
        page.insert_text((100, 298), f"{venta.fecha}", fontsize=12)
        page.insert_text((105, 197), f"{venta.cliente.nombre}", fontsize=10)
        page.insert_text((125, 210), f"{venta.cliente.identificacion}", fontsize=10)
        page.insert_text((95, 223), f"{venta.cliente.email}", fontsize=10)
        page.insert_text((107, 235), f"{venta.cliente.telefono}", fontsize=10)
        page.insert_text((443, 532), f"{venta.total}", fontsize=12)

        # Añadir los detalles de la venta
        y_position = 350  # Posición Y inicial para los detalles
        for detalle in detalles_venta:
            page.insert_text((72, y_position), f"{detalle.producto.nombre}", fontsize=11)
            page.insert_text((315, y_position), f"{detalle.cantidad}", fontsize=11)
            page.insert_text((390, y_position), f"{detalle.precio}", fontsize=11)
            page.insert_text((480, y_position), f"{detalle.precio * detalle.cantidad}", fontsize=11 , color=(1, 0, 0))
            y_position += 30

        # Guardar el archivo PDF modificado en memoria
        pdf_stream = io.BytesIO()
        pdf_document.save(pdf_stream)
        pdf_stream.seek(0)

        # Preparar la respuesta HTTP con el archivo PDF
        response = HttpResponse(pdf_stream, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="Factura-{venta.id}.pdf"'

        return response

    except Exception as e:
        return HttpResponse(f"Error al generar el PDF: {e}", status=500)
