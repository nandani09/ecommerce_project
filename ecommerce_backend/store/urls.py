from django.urls import path
from .views import LoginView, ProductListCreateView,RegisterView,ProductUpdateView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/', ProductListCreateView.as_view(), name='products'),
    path('products/<int:pk>/', ProductUpdateView.as_view(), name='product-update'),
    
    
]