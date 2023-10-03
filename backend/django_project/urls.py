from django.urls import path
from .views import HomePageView, CompanyPageView

# Can be added if more pages creating 
urlpatterns = [
    path('', HomePageView.as_view(), name = 'home'),
    path('company/', CompanyPageView.as_view(),name='company'),
]