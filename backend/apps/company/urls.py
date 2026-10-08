from django.urls import path

from .views import company_overview

urlpatterns = [
    path('overview/', company_overview, name='company-overview'),
]
