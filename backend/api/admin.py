from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(Customer)
admin.site.register(Employee)
admin.site.register(Branch)
admin.site.register(Car)
admin.site.register(CarType)
class RentalAdmin(admin.ModelAdmin):
    readonly_fields = ('totalCost','goldMember')
    
admin.site.register(Rental, RentalAdmin)

