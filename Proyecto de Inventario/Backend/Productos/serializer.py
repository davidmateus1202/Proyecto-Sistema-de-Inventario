from rest_framework import serializers
from .models import Producto


class ProductosSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField('get_image_url')
    class Meta:
        model = Producto
        fields = '__all__'


    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None