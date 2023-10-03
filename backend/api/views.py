from multiprocessing import context
from django.shortcuts import render
from rest_framework import generics, viewsets
from .serializers import CustomerSerializer, EmployeeSerializer, CarTypeSerializer, CarSerializer, BranchSerializer, RentalSerializer
from .models import Customer, Employee, CarType, Rental, Branch, Car

# Create your views here.
class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer      
    queryset = Customer.objects.all()

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer      
    queryset = Employee.objects.all()

class CarTypeView(viewsets.ModelViewSet):
    serializer_class = CarTypeSerializer      
    queryset = CarType.objects.all()

class CarView(viewsets.ModelViewSet):
    serializer_class = CarSerializer      
    queryset = Car.objects.all()

class BranchView(viewsets.ModelViewSet):
    serializer_class = BranchSerializer      
    queryset = Branch.objects.all()

class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer      
    queryset = Rental.objects.all()

    
    # def perform_create(self, serializer):
    #     self.request.data.get("carType", None)
        
    #     totalCost = 1000
    #     serializer.save(totalCost)
    #     #carType_object = self.carType
    #     #daily = serializer.validated_data['daily'] # get the value of hours
    #     #payment_rate = carType_object.dailyCost # get the value of 'paymentRate' from work assignment object
    #     #totalCost = payment_rate # calculate value of total payment
    #     #serializer.save(totalCost=totalCost, CarType=carType_object.typeId)

