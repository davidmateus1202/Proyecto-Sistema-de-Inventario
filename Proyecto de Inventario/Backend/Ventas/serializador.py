from rest_framework import serializers
from .models import Venta, DetalleVenta



class VentaSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model = Venta
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}  # Hacer que el campo user no sea obligatorio en el serializador
        }
    def get_nombre_cliente(self, obj):
        return obj.cliente.nombre


class DetalleVentaSerializer(serializers.ModelSerializer):

    class Meta:
        model = DetalleVenta
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}  # Hacer que el campo user no sea obligatorio en el serializador
        }