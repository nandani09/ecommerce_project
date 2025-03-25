from django.db import models

class Branch(models.Model):
    name = models.CharField(max_length=50, unique=True)
    def __str__(self): return self.name

class Product(models.Model):
    name = models.CharField(max_length=100)
    branch = models.ForeignKey(Branch, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    def __str__(self): return self.name
