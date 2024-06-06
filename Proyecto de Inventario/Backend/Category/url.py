from django.urls import path, include
from .views import CreateCategory, CategoryViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"Category", CategoryViewset, "Category")

urlpatterns = [

    path('create_category/', CreateCategory.as_view(), name='create_category'),
    path('cat/', include(router.urls)),
]