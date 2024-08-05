from django.urls import path
from .views import CategoryView, CategoryDelete, CategoryUpdate



urlpatterns = [

    path('category/', CategoryView.as_view(), name='create_category'),
    path('delete/<int:pk>/', CategoryDelete.as_view(), name='delete_category'),
    path('update/<int:pk>/', CategoryUpdate.as_view(), name='update_category'),
    
]