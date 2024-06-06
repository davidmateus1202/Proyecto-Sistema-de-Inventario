from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name_category = models.CharField(max_length=1000)


    def __str__(self) -> str:
        return f'{self.name_category}'