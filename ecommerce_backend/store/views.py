from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Product, Branch
from .serializers import UserSerializer, ProductSerializer
from django.contrib.auth import authenticate

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

class LoginView(APIView):
    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            
            print(f"Login attempt: username={username}")

            if not username or not password:
                print("Missing required fields")
                return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

            # Authenticate the user
            user = authenticate(username=username, password=password)
            if not user:
                print(f"Authentication failed for username={username}")
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

            # Generate or get the token
            try:
                token, created = Token.objects.get_or_create(user=user)
            except Exception as e:
                print(f"Error creating token: {str(e)}")
                return Response({'error': 'Failed to create token'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({'token': token.key})
        except Exception as e:
            print(f"Unexpected error in LoginView: {str(e)}")
            return Response({'error': 'Unexpected server error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]  # Explicitly define parsers

    def get_queryset(self):
        try:
            branch_name = self.request.query_params.get('branch')
            if branch_name:
                branch = Branch.objects.get(name__iexact=branch_name)
                return Product.objects.filter(branch=branch)
            return Product.objects.all()
        except Branch.DoesNotExist:
            print(f"Branch not found: {branch_name}")
            return Product.objects.none()
        except Exception as e:
            print(f"Error in get_queryset: {str(e)}")
            return Product.objects.none()