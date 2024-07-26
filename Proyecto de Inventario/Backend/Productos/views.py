from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Producto
from .serializer import ProductosSerializer
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny


class ProductosView(generics.ListCreateAPIView):
    serializer_class = ProductosSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Producto.objects.filter(user=user)
    
    def perform_create(self, serializer):
        
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            return serializer.errors


class ProductosUpdate(generics.UpdateAPIView):
    serializer_class = ProductosSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        return Producto.objects.filter(user=user)
    