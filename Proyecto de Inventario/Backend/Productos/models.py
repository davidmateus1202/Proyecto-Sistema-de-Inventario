from django.db import models
from django.contrib.auth.models import User
from Category.models import Category

class Producto(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    categoria = models.ForeignKey(Category, on_delete=models.CASCADE)
    codigo = models.CharField(max_length=1000)
    nombre = models.CharField(max_length=1000)
    unidades = models.IntegerField()
    precio_compra = models.FloatField()
    precio = models.FloatField()
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f'| Categoria: {self.categoria} | Nombre: {self.nombre} |'
