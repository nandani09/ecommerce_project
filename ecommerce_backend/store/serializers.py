from rest_framework import serializers
from .models import Product, Branch
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class ProductSerializer(serializers.ModelSerializer):
    branch_name = serializers.SerializerMethodField()  # Read-only branch name
    branch = serializers.SlugRelatedField(
        queryset=Branch.objects.all(), slug_field='name', write_only=True
    )  # Accepts branch name instead of ID

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'stock', 'branch', 'branch_name', 'image', 'description']
        extra_kwargs = {'branch': {'write_only': True}}

    def get_branch_name(self, obj):
        """Returns the branch name for representation"""
        return obj.branch.name if obj.branch else None

    def get_image(self, obj):
        """Returns the full image URL"""
        if obj.image:
            return self.context['request'].build_absolute_uri(obj.image.url)
        return None

    def create(self, validated_data):
        """Handles product creation"""
        return Product.objects.create(**validated_data)

    def to_representation(self, instance):
        """Ensures branch name is included in the response"""
        representation = super().to_representation(instance)
        representation['branch'] = instance.branch.name if instance.branch else None
        return representation
