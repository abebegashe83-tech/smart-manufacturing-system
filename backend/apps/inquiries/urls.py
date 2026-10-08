from django.urls import path

from .views import inquiry_form

urlpatterns = [
    path('submit/', inquiry_form, name='inquiry-submit'),
]
