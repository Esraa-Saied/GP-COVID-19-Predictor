from django.db import models

# Create your models here.

class data_covid19v10(models.Model):
    continent = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    date = models.DateField()
    total_cases = models.IntegerField()
    new_cases = models.IntegerField()
    total_deaths = models.IntegerField()
    new_deaths = models.IntegerField()
    total_recovery = models.IntegerField()
    new_recovery = models.IntegerField()

class cotinent_covid19v10(models.Model):
    continent = models.CharField(max_length=100)
    date = models.DateField()
    cases = models.IntegerField()
    deaths = models.IntegerField()
    recovery = models.IntegerField()

class metaData(models.Model):
    Date = models.DateField('2021-07-10')