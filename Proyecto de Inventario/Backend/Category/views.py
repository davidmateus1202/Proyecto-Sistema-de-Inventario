from django.shortcuts import render
from .models import Category
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import CategorySerializer


class CategoryView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Category.objects.filter(user=user)
    
    def perform_create(self, serializer):
        
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            return serializer.errors
        
# Create your views for delete

class CategoryDelete(generics.DestroyAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        user = self.request.user
        return Category.objects.filter(user=user)   


class CategoryUpdate(generics.UpdateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Category.objects.filter(user=user)
