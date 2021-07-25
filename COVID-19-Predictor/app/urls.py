"""app URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from TheWebSite import views
from XRay import home,upload

urlpatterns = [
    path('admin/', admin.site.urls),
    path('prediction/', views.prediction, name='prediction'),
    path('', views.index, name='index'),
    path('xray/', views.XRay, name='xray'),
    path('upload/', views.upload, name='upload'),
    path('ajax/foo/', views.getCountryData, name='ajax_foobar'),
    path('getActualConfirmed/', views.getActualConfirmed),
    path('forecastConfirmedCases/', views.forecastConfirmedCases),
    path('getActualDeath/', views.getActualDeath),
    path('getActualRecovered/', views.getActualRecovered),
    path('/index/table', views.table, name='table'),
    path('forecastConfirmedCases/', views.forecastConfirmedCases),
]

