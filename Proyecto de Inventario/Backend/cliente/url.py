from django.urls import path # type: ignore
from .views import ClienteView, ClienteDelete


urlpatterns = [

    path('cliente/', ClienteView.as_view(), name='create_cliente'),
    path('cliente/delete/<int:pk>/', ClienteDelete.as_view(), name='delete_cliente'),




]