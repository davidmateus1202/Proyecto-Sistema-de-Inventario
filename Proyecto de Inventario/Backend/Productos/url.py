from django.urls import path
from .views import ProductosView


urlpatterns = [


    path('product/', ProductosView.as_view(), name='create_product'),

]