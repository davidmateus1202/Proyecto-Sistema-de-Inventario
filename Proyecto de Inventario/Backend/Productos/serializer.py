from rest_framework import serializers
from .models import Producto


class ProductosSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    categoria_nombre = serializers.SerializerMethodField('get_categoria_nombre')
    class Meta:
        model = Producto
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}  # Hacer que el campo user no sea obligatorio en el serializador
        }

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None
    
    def get_categoria_nombre(self, obj):
        return obj.categoria.name_category

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        validated_data['user'] = user
        return super().create(validated_data)