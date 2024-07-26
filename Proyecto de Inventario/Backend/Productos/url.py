from django.urls import path
from .views import ProductosView, ProductosUpdate


urlpatterns = [


    path('product/', ProductosView.as_view(), name='create_product'),
    path('update/producto/<int:pk>/', ProductosUpdate.as_view(), name='update_product'),  

]
