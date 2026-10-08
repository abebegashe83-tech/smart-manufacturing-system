from django.urls import path

from .views import product_categories

urlpatterns = [
    path('categories/', product_categories, name='product-categories'),
]
