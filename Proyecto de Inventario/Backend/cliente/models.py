from django.db import models
from django.contrib.auth.models import User



class Cliente(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=1000)
    tipo_id = models.CharField(max_length=1000)
    identificacion = models.CharField(max_length=1000, unique=True)
    telefono = models.CharField(max_length=1000, null=True, blank=True)
    email = models.CharField(max_length=1000, null=True, blank=True)

