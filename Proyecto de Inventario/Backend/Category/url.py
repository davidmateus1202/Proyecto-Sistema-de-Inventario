from django.urls import path, include
from .views import CategoryView, CategoryViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"Category", CategoryViewset, "Category")

urlpatterns = [

    path('category/', CategoryView.as_view(), name='create_category'),
    path('cat/', include(router.urls)),
]