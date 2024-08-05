from django.db import models
from django.contrib.auth.models import User
from Productos.models import Producto
from cliente.models import Cliente


class Venta(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, on_delete=models.PROTECT)  
    total = models.FloatField()
    fecha = models.DateField(auto_now_add=True)


    def calcular_total(self):
        detalles = DetalleVenta.objects.filter(venta=self)
        total = 0
        for detalle in detalles:
            total += detalle.precio * detalle.cantidad
        return total


    def __str__(self):
        return f'| Usuario: {self.user} | Total: {self.total} | Fecha: {self.fecha} | Cliente: {self.cliente.nombre} |'
    



class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio = models.FloatField()


    def __str__(self):
        return f'| Venta: {self.venta} | Cantidad: {self.cantidad} | Precio: {self.precio} | Producto: {self.producto} |'


