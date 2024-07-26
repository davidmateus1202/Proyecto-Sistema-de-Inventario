from django.urls import path # type: ignore
from .views import ClienteView


urlpatterns = [

    path('cliente/', ClienteView.as_view(), name='create_cliente'),




]