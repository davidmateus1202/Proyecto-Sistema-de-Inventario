from rest_framework import serializers # type: ignore
from .models import Cliente



class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False}  # Hacer que el campo user no sea obligatorio en el serializador
        }

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        validated_data['user'] = user

        return super().create(validated_data)


