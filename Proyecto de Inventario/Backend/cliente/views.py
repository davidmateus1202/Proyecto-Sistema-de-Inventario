from django.shortcuts import render
from .models import Cliente
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import ClienteSerializer



class ClienteView(generics.ListCreateAPIView):
    serializer_class = ClienteSerializer
    IsAuthenticated = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cliente.objects.filter(user=user)
    
    def perfom_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            return serializer.errors

class ClienteDelete(generics.DestroyAPIView):
    serializer_class = ClienteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Cliente.objects.filter(user=user)

