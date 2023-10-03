from cgi import print_form
from email.policy import default
from unittest.util import _MAX_LENGTH
from xml.sax import saxutils
from django.db import models
from django.utils.text import slugify
from datetime import date


class Branch(models.Model):
    branchId = models.AutoField(primary_key=True)
    province = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    postalCode = models.CharField(max_length=20)
    streetNumber = models.CharField(max_length=20)
    streetName = models.CharField(max_length=20)
    unitNumber = models.CharField(max_length=20, null=True, blank=True)
    phoneNumber1 = models.CharField(max_length=15, null=True, blank=True)
    phoneNumber2 = models.CharField(max_length=15, null=True, blank=True)
    phoneNumber3 = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.city

# Creating Customer Table
class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    driversLicense = models.CharField(max_length=20)
    email = models.EmailField()
    dob = models.DateField()
    goldMember = models.BooleanField(default = False)    # Defalut is False!!
    province = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    postalCode = models.CharField(max_length=20)
    streetNumber = models.CharField(max_length=20)
    streetName = models.CharField(max_length=20)
    unitNumber = models.CharField(max_length=20, null=True, blank=True)
    phoneNumber1 = models.CharField(max_length=15, null=True, blank=True)
    phoneNumber2 = models.CharField(max_length=15, null=True, blank=True)
    phoneNumber3 = models.CharField(max_length=15, null=True, blank=True)

    @property
    def name(self):
        return u'%s %s' % (self.firstName, self.lastName)
    
    @property
    def street(self):
        return u'%d - %d %s' % (self.unitNumber, self.streetNumber, self.streetName)

    @property
    def address(self):
        return self.street(self) + u'%s %s %s' % (self.city, self.province, self.postalCode)

    @property
    def phoneNumber(self):
        return u'%s\n%s\n%s\n' % (self.phoneNumber1, self.phoneNumber2, self.phoneNumber3)

    def __str__(self):
        return self.name


class CarType(models.Model):
    typeId = models.AutoField(primary_key=True)
    description = models.CharField(max_length=100)
    dailyCost = models.IntegerField(default = 0)
    weeklyCost = models.IntegerField(default = 0)
    monthlyCost = models.IntegerField(default = 0)
    lateFee = models.IntegerField(default = 0)
    changeBranchFee = models.IntegerField(default = 0)  

    def __str__(self):
        return self.description


class Car(models.Model):
    carId = models.AutoField(primary_key=True)
    carType = models.ForeignKey(CarType, on_delete = models.CASCADE)
    branch = models.ForeignKey(Branch, on_delete = models.CASCADE)
    manufacturer = models.CharField(max_length=20)
    model = models.CharField(max_length=20)
    fuelType = models.CharField(max_length=20)
    colour = models.CharField(max_length=20)
    licencePlate = models.CharField(max_length=20)
    status = models.CharField(max_length=20)    
    mileage= models.CharField(max_length=20)

    def __str__(self):
        return self.manufacturer + " " + self.model

class Employee(models.Model):
    employeeId = models.AutoField(primary_key=True)
    branch = models.ForeignKey(Branch, on_delete = models.CASCADE)
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    salt = models.CharField(max_length=100)
    salary = models.IntegerField(default = 0)
    rank= models.CharField(max_length=100)
    dob = models.DateField()
    province = models.CharField(max_length=20)
    city = models.CharField(max_length=20)
    postalCode = models.CharField(max_length=20)
    streetNumber = models.CharField(max_length=20)
    streetName = models.CharField(max_length=20)
    unitNumber = models.CharField(max_length=20, null=True, blank=True)
    phoneNumber1 = models.CharField(max_length=15, null=True, blank=True)
    phoneNumber2 = models.CharField(max_length=15, null=True, blank=True)
    phoneNumber3 = models.CharField(max_length=15, null=True, blank=True)

    def __str__(self):
        return self.firstName + " " + self.lastName


class Rental(models.Model):
    rentalId = models.AutoField(primary_key=True)
    carType = models.ForeignKey(CarType, on_delete = models.CASCADE)
    car = models.ForeignKey(Car, on_delete = models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete = models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete = models.CASCADE)
    branchDep = models.ForeignKey(Branch, related_name = "branchD", on_delete = models.CASCADE)
    branchArr = models.ForeignKey(Branch, related_name = "branchA", on_delete = models.CASCADE)
    dateFrom = models.DateField(default=date.today)
    dateTo = models.DateField(default=date.today)
    dateReturned = models.DateField(default=date.today)
    licensePlate = models.CharField(max_length=20)
 
    def total_cost(self):
        total_days, months, weeks, days = 0, 0, 0, 0
        total, month_cost, week_cost, day_cost = 0, 0, 0, 0
        diff_late, diff_to, diff_re, late, branch = 0, 0, 0, 0, 0
        
        # get all different days combinations
        diff_late = (self.dateReturned - self.dateTo).days
        diff_to = (self.dateFrom - self.dateTo).days
        diff_re = (self.dateFrom - self.dateReturned).days
 
        # late fee charging 
        if diff_late > 0:          # if car is not returned as planed
            if diff_late <= 15:
                late = self.late   
            if diff_late > 15:  # if later than 15 days, late fee increases 
                late = self.late * 3
            total_days = abs(diff_re)
        elif diff_late <= 0:
            total_days = abs(diff_to)

        # if it returned on same day, still need to be charged for one day cost
        if total_days == 0:
            total_days = 1

        # get how many months, weeks, and days
        months = total_days // 30
        weeks = (total_days - months*30) // 7
        days = (total_days - months*30 - weeks*7) 
       
       # get charges based on calculated months, weeks, and days
        if months > 0:
            month_cost = self.monthly * months
        if weeks > 0:
            week_cost = self.weekly * weeks
        if days > 0:
            day_cost = self.daily * days
        
        # charge fee if departure branch and arrival branch is not the same
        if self.branchDep != self.branchArr:
            branch = self.changeBranch
            # however, if customer is a gold star member, don't charge any branch fee
            if self.customer.goldMember == True:
                branch = 0
        
        # get total price by sum all the values, then return 
        total = month_cost + week_cost + day_cost + late + branch
        return total
       
    @property
    def daily(self):
        return self.carType.dailyCost
    
    @property
    def weekly(self):
        return self.carType.weeklyCost

    @property
    def monthly(self):
        return self.carType.monthlyCost

    @property
    def late(self):
        return self.carType.lateFee

    @property
    def changeBranch(self):
        return self.carType.changeBranchFee

    totalCost = property(total_cost)

    def gold(self):
        if self.customer.goldMember == True:
            return "Yes"
        else:
            return "No"
    goldMember = property(gold)


