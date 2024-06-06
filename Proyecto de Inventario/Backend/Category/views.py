from django.shortcuts import render
from .models import Category
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializer import CategorySerializer


class CreateCategory(generics.ListCreateAPIView):
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
        

class CategoryViewset(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()