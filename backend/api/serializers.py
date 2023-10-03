from rest_framework import serializers
from .models import Customer, Employee, Branch, Rental, Car, CarType


class RentalSerializer(serializers.ModelSerializer):
    totalCost = serializers.ReadOnlyField()
    goldMember = serializers.ReadOnlyField()
    class Meta: 
        model = Rental
        fields = "__all__"

class CustomerSerializer(serializers.ModelSerializer):
    rental = RentalSerializer(read_only=True, many=True) 
    class Meta: 
        model = Customer
        fields = "__all__"


class CarSerializer(serializers.ModelSerializer):
    rental = RentalSerializer(read_only=True, many=True) 
    class Meta: 
        model = Car
        fields = "__all__"


class CarTypeSerializer(serializers.ModelSerializer):
    rental = RentalSerializer(read_only=True, many=True) 
    car = CarSerializer(read_only=True, many=True) 
    class Meta: 
        model = CarType
        fields = "__all__"     


class EmployeeSerializer(serializers.ModelSerializer):
    rental = RentalSerializer(read_only=True, many=True) 
    class Meta: 
        model = Employee
        fields = "__all__"

class BranchSerializer(serializers.ModelSerializer):
    rental = RentalSerializer(read_only=True, many=True) 
    employee = EmployeeSerializer(read_only=True, many=False)
    car = CarSerializer(read_only=True, many=True) 
    class Meta: 
        model = Branch
        fields = "__all__"