#import simplejson as simplejson
from _csv import reader
from django.db import connection
from django.shortcuts import render
from django.http import HttpResponse
import json
import pandas as pd
from django.shortcuts import render
import numpy as np
from csv import reader
from django.core import serializers
from django.http import JsonResponse
from .models import data_covid19v10
from .models import cotinent_covid19v10

from flask import Flask, render_template, request
from PIL import Image

from mlengine import model,transform,predict
from django.views.decorators.csrf import csrf_protect
import os
import datetime
import itertools as it
import json
import math
from datetime import timedelta, datetime
import numpy as np
import pandas as pd
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
import csv




model_path = 'model/state_dict_model4.pt'

app=Flask(__name__)
model = model(model_path)
preprocess  = transform()

@csrf_protect
@app.route('/')
def XRay(request):
    return  render(request,'XRay.html')

@app.route('/upload' ,methods=['POST','GET'])
def upload(request):
    if request.method =='POST':

        img_file = request.FILES["image"]
        #img = Image.open(r"D:\Toqa GP\NewVirsion XRay\data_upload_v3\data_upload_v3\test\non\patient00003-study1-view1_frontal.jpg")
        image=Image.open(img_file).convert('RGB')
        label , prob = predict(model, preprocess,image)

        return render(request, 'Result.html', {'label': label, 'prob': prob})
    else:
        return render(request, 'XRay.html')

#def prediction(request):
 #   return render(request, "prediction.html")

countriesName = []
allData = serializers.serialize("json", data_covid19v10.objects.all())
allrecords = data_covid19v10.objects.filter(date__range=["2021-02-16", "2021-02-26"])
wholeData = serializers.serialize("json", data_covid19v10.objects.filter(date__range=["2021-02-16", "2021-02-26"]))
continent = serializers.serialize("json", cotinent_covid19v10.objects.all())

for record in allrecords:
     countriesName.append(record.location)


def table(request):
    return  render(request,'table.html',{'wholeData':allData})

def index(request):
    return render(request, "index.html",
                 {'countriesName': countriesName,'wholeData':wholeData,'continent':continent})






import math
from datetime import timedelta


from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import pandas as pd
import numpy as np

# Create your views here.
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
import tensorflow as tf
from tensorflow.python.keras.preprocessing.sequence import TimeseriesGenerator


def prediction(request):
    return render(request, 'Hello.html')


country = "Egypt"
df_confirmed = pd.read_csv(
    "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
# df_confirmed.to_csv('global.csv')
df_confirmed_country = df_confirmed[df_confirmed["Country/Region"] == country]
df_confirmed_country = pd.DataFrame(df_confirmed_country[df_confirmed_country.columns[4:]].sum(), columns=["confirmed"])
df_confirmed_country.index = pd.to_datetime(df_confirmed_country.index, format='%m/%d/%y')


def getActualConfirmed(request):
    data = []
    for index, row in df_confirmed_country.iterrows():
        data.append([index, row['confirmed']])

    confirmedCases = []
    date = []
    for i in range(1, len(data)):
        confirmedCases.append(int(data[i][1] - data[i - 1][1]))
        date.append(data[i][0].strftime('%Y/%m/%d'))
    x = {
        'date': date,
        'confirmed': confirmedCases

    }
    return JsonResponse(x)


# def forecastConfirmedCases(request):
#     model = load_model('./predictionModelV4.h5')
#     print(model.summary())
#
#     country = "Egypt"
#
#     # Total COVID confirmed cases
#     df_confirmed = pd.read_csv(
#         "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv")
#     df_confirmed_country = df_confirmed[df_confirmed["Country/Region"] == country]
#     df_confirmed_country = pd.DataFrame(df_confirmed_country[df_confirmed_country.columns[4:]].sum(),
#                                         columns=["confirmed"])
#     df_confirmed_country['res'] = df_confirmed_country['confirmed'].diff().fillna(
#         df_confirmed_country['confirmed']).astype(int)
#     del df_confirmed_country['confirmed']
#     df_confirmed_country.rename({"res": "confirmed"}, axis='columns', inplace=True)
#
#     df = df_confirmed_country
#     df.index = pd.to_datetime(df.index)
#
#     # training and testing
#     train = df.iloc[:math.floor(80 / 100 * len(df))]
#     test = df.iloc[math.floor(80 / 100 * len(df)):]
#
#     scaler = MinMaxScaler()
#     scaler.fit(train)
#     scaled_train = scaler.transform(train)
#     scaler.transform(test)
#
#     # generator dif
#     n_input = 45
#     n_features = 1
#
#     import tensorflow as tf;
#
#
#
#     last_train_batch = scaled_train[-45:]
#     last_train_batch = last_train_batch.reshape((1, n_input, n_features))
#     model.predict(last_train_batch)
#
#     test_prediction = []
#     first_eval_batch = scaled_train[-n_input:]
#     current_batch = first_eval_batch.reshape((1, n_input, n_features))
#     for i in range(len(test) + 45):
#         current_prediction = model.predict(current_batch)[0]
#         test_prediction.append(current_prediction)
#         current_batch = np.append(current_batch[:, 1:, :], [[current_prediction]], axis=1)
#     reversed_scaled_predicitons = scaler.inverse_transform(test_prediction)
#
#     date = []
#     startData = test.index.tolist()[0]
#
#     for i in range(len(test) + 15):
#         date.append(startData)
#         startData += timedelta(days=1)
#
#     print(date)
#     print(reversed_scaled_predicitons)
#     forecast = []
#     for element in reversed_scaled_predicitons:
#         forecast.append(math.floor(element))
#
#     forecast_date = {
#         "date": date,
#         "forecast-confirmed": forecast
#
#     }
#
#     return JsonResponse(forecast_date)
def forecastConfirmedCases(request):
    """
    function to perform basic forecasting for Egypt
    @rtype: object
    """
    forecasting_model = load_model('./PredictionModelV4.h5')
    classification_model = load_model('./COV19ClassificationModel.h5')
    weather_occasion = pd.read_csv(
        os.path.join(os.path.dirname(os.path.dirname(__file__)), 'Egypt_Occasion_Waether_Data.csv'), index_col='Date')
    predictions = classification_model.predict(
        x=weather_occasion,
        batch_size=10,
        verbose=0
    )
    rounded_predictions = np.argmax(predictions, axis=-1).tolist()
    weather_occasion['predictions'] = rounded_predictions
    result_set = getCountryData("Egypt")
    date = []
    confirmed = []
    for i in range (len(result_set)):
        date.append(result_set[i]['Date'])
        confirmed.append(result_set[i]['confirmed_cases'])
    df_confirmed_country = pd.DataFrame(index=date)
    df_confirmed_country['confirmed'] = confirmed
    df_confirmed_country = df_confirmed_country[:-1]
    train_set = df_confirmed_country.iloc[:math.ceil(80 / 100 * len(df_confirmed_country))]
    test_set = df_confirmed_country.iloc[math.ceil(80 / 100 * len(df_confirmed_country)):]
    date_time_obj = datetime.strptime(test_set.index.tolist()[0],'%Y-%m-%d')
    n_input = 45
    n_feature = 1
    scaler = MinMaxScaler()
    scaler.fit(train_set)
    scaled_train = scaler.transform(train_set)
    test_predictions = []
    forecast_date = []
    first_eval_batch = scaled_train[-n_input:]
    current_batch = first_eval_batch.reshape((1, n_input, n_feature))
    for i in range(len(test_set) + 45):
        # get the prediction value for the first batch
        current_pred = forecasting_model.predict(current_batch)[0]
        # append the prediction into the array
        test_predictions.append(current_pred)
        forecast_date.append(str(date_time_obj.date()))
        date_time_obj += timedelta(days=1)
        # use the prediction to update the batch and remove the first value
        current_batch = np.append(current_batch[:, 1:, :], [[current_pred]], axis=1)

    true_predictions = scaler.inverse_transform(test_predictions)

    x = {
        "date": forecast_date,
        "Forecast": sum(true_predictions.tolist(), []),
        "adjusted": adjustForecast(sum(true_predictions.tolist(), []), weather_occasion)
    }

    return JsonResponse(x)


def adjustForecast(unadjusted_forecast,adjusted_helper):


    print('LENGTH IS ', len(unadjusted_forecast))

    LINEAR = []
    for i in range (-1*int((len(unadjusted_forecast)+45)/2),int((len(unadjusted_forecast)+45)/2)):
        LINEAR.append(i**2*-0.2)


    print(LINEAR)

    for i in range (len(unadjusted_forecast)):
       unadjusted_forecast[i]=unadjusted_forecast[i]+LINEAR[i]+2000
    return unadjusted_forecast


def getActualDeath(request):
    country = "Egypt"
    df_confirmed = pd.read_csv(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv")
    # df_confirmed.to_csv('global.csv')
    df_confirmed_country = df_confirmed[df_confirmed["Country/Region"] == country]
    df_confirmed_country = pd.DataFrame(df_confirmed_country[df_confirmed_country.columns[4:]].sum(),
                                        columns=["death"])
    data = []
    for index, row in df_confirmed_country.iterrows():
        data.append([index, row['death']])
    death = []
    date = []
    for i in range(1, len(data)):
        death.append(int(data[i][1] - data[i - 1][1]))
        date.append(data[i][0])
    x = {
        'death': death,
        'date': date,
    }
    return JsonResponse(x);

def getCountryData(country_name):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM public.\"" + country_name + "\"")
    result_set = cursor.fetchall()
    result = []
    for row in result_set:
        x = {
            "Date": str(row[1]),
            "cumulative_confirmed_cases": row[2],
            "confirmed_cases": row[3],
            "cumulative_recovered_cases": row[4],
            "recovered_cases": row[5],
            "cumulative_death_cases": row[6],
            "death_cases": row[7]
        }
        result.append(x)
    return result



def getActualRecovered(request):
    country = "Egypt"
    df_confirmed = pd.read_csv(
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv")
    # df_confirmed.to_csv('global.csv')
    df_confirmed_country = df_confirmed[df_confirmed["Country/Region"] == country]
    df_confirmed_country = pd.DataFrame(df_confirmed_country[df_confirmed_country.columns[4:]].sum(),
                                        columns=["recovered"])
    data = []
    for index, row in df_confirmed_country.iterrows():
        data.append([index, row['recovered']])
    death = []
    date = []
    for i in range(1, len(data)):
        death.append(int(data[i][1] - data[i - 1][1]))
        date.append(data[i][0])
    x = {
        'recovered': death,
        'date': date,
    }
    return JsonResponse(x)


def returnForecastedDeath(request):
    return 0