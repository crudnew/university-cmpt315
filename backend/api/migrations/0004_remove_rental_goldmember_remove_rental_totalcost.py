# Generated by Django 4.1.2 on 2022-10-27 17:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_rental_datereturned'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='rental',
            name='goldMember',
        ),
        migrations.RemoveField(
            model_name='rental',
            name='totalCost',
        ),
    ]
