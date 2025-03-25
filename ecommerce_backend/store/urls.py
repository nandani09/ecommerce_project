from django.urls import path
from .views import RegisterView, LoginView, ProductListCreateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductListCreateView.as_view(), name='products'),
    
    
]