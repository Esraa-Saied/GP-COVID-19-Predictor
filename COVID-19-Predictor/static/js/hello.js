$(document).ready(function () {

    $('.buttons-csv').addClass('btn-primary')
    $('#conf-table').DataTable(
        {
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        }
    );
    $('#death-table').DataTable(
        {
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        }
    );$('#recovered-table').DataTable(
        {
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ]
        }
    );
});


$.fn.dataTable.Buttons.defaults.dom.button.className = 'btn btn-primary mtb-5';


//functions to get forecast
function getPrediction() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/forecastConfirmedCases/', false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

//-------------------------


//function to get actual data
function getActualConfirmed() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/getActualConfirmed/', false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

function getActualRecovered() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/getActualRecovered/', false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

function getActualDeath() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://127.0.0.1:8000/getActualDeath/', false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.response);
}

// ----------------------- //
//functions to construct graphs
 function getPrediction() {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", 'http://127.0.0.1:8000/forecastConfirmedCases/', false); // false for synchronous request
        xmlHttp.send(null);
         console.log("getpredictdate")
        return JSON.parse(xmlHttp.response);

    }

function constructConfirmedGraph() {
    predictedDate = getPrediction()

    console.log("predictdate",  predictedDate)

    var confirmedPrediction = []
    var confirmedPredictionAdjusted = []

    var deathPredcition = []
    var deathPredcitionAdjusted = []

    var recoveredPredcition = []
    var recoveredPredcitionAdjusted = []


    for (let i = 0; i < predictedDate['date'].length; i++) {
        confirmedPrediction.push([new Date(predictedDate['date'][i]).getTime(), predictedDate['Forecast'][i]])
        confirmedPredictionAdjusted.push([new Date(predictedDate['date'][i]).getTime(), predictedDate['adjusted'][i]])

        deathPredcition.push([new Date(predictedDate['date'][i]).getTime(), 6.36 + predictedDate['Forecast'][i] * 0.0451])
        deathPredcitionAdjusted.push([new Date(predictedDate['date'][i]).getTime(), 6.36 + predictedDate['adjusted'][i] * 0.0451])

        recoveredPredcition.push([new Date(predictedDate['date'][i]).getTime(), (4.36 + predictedDate['Forecast'][i] * 0.0751)+350])
        recoveredPredcitionAdjusted.push([new Date(predictedDate['date'][i]).getTime(), (4.36 + predictedDate['adjusted'][i] * 0.0751)+350])



    }
    confirmedActual = parseDate(getActualConfirmed(), 'date', 'confirmed')
    Highcharts.chart('container', configGraph(
    'Confirmed Cases vs Prediction confirmed cases vs Prediction Adjusted Forecast',
    'Actual Confirmed Cases',confirmedActual, '#ff8f00',
    'Forecasted Confirmed Cases',confirmedPrediction, '#007f05',
    'Adjusted Forecast Confirmed Cases', confirmedPredictionAdjusted,'#154997'
    ));
    populateForecastingTable(confirmedPrediction, '#confirmed-cases')
    constructDeathGraph(deathPredcition,deathPredcitionAdjusted)
    constructRecoveredGraph(recoveredPredcition,recoveredPredcitionAdjusted)
}




function constructDeathGraph(dethPrediction ,deathPredcitionAdjusted) {
    var deathActual = parseDate(getActualDeath(), 'date', 'death')
    Highcharts.chart('container2', configGraph(
    'Deaths Cases vs Prediction Deaths cases vs Deaths Adjusted Forecast',
    'Actual Death Cases',deathActual, '#db0000',
    'Forecasted Deaths Cases', dethPrediction, '#280000',
    'Adjusted Death Forecast',deathPredcitionAdjusted,'#215164'
    ));
    populateForecastingTable(dethPrediction, "#death-cases")
}
function constructRecoveredGraph(recoveredPrediction ,recoveredPredictionAdjusted) {
    var recoveredActual = parseDate(getActualRecovered(), 'date', 'recovered')

    Highcharts.chart('container3', configGraph(
    'recovered Cases vs Prediction recovered cases vs recovered Adjusted Forecast',
    'Actual recovered Cases',recoveredActual, '#db0000',
    'Forecasted recovered Cases', recoveredPrediction, '#280000',
    'Adjusted recovered Forecast',recoveredPredictionAdjusted,'#215164'
    ));
    populateForecastingTable(recoveredPrediction, "#recovred-cases")
}


function parseDate(wholeData, dateAttr = "date", metric) {
    parsedDate = []
    for (let i = 0; i < wholeData[dateAttr].length; i++) {
        parsedDate.push([new Date(wholeData[dateAttr][i]).getTime(), wholeData[metric][i]])
    }
    return parsedDate
}

function configGraph(graphTitle,
        actualSeriesName,actualData, ActualDataSeriesColor,
        predictionSeriesName, PredictionData, PredictionDataDataSeriesColor,
        adjustedSeriesName,adjustedData,adjustedDataSeriesColor) {
    config = {
        tooltip: {
            xDateFormat: '%d/%m/%Y',
            shared: true,
            split: true,
            enabled: true
        },
        chart: {
            type: 'line',
            zoomType: 'x',
            backgroundColor : 'transparent'
        },
        title: {
            text: graphTitle
        },
        subtitle: {
            text: 'Source: Johns Hopkins University'
        },
        yAxis: {
            title: {
                text: 'Death Cases'
            }
        },
        xAxis: {
            type: 'datetime',
//            plotLines: [{
//                color: '#181414',
//                width: 2,
//                value: PredictionData[0][0],
//                dashStyle: 'ShortDot'
//            }]
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0
        },
        series: [{
            name: actualSeriesName,
            data: actualData,
            color: ActualDataSeriesColor,
        },
            {
                name: predictionSeriesName,
                data: PredictionData,

                color: PredictionDataDataSeriesColor
            },
            {
                name: adjustedSeriesName,
                data: adjustedData,
                dashStyle: 'longdash',
                color: adjustedDataSeriesColor
            }]
        , plotOptions: {
            series: {
                compare: 'percent',
                showInNavigator: true,
                dataGrouping: {
                    enabled: false
                },
            }
        },
    }
    return config
}

function populateForecastingTable(predictedDate, tableClassName) {
    for (let i = 0; i < predictedDate.length; i++) {
        tableRow = document.createElement('tr')
        CounterData = document.createElement('td')
        dateData = document.createElement('td')
        newConfirmedData = document.createElement('td')
        CounterData.append(i + 1)
        date = new Date (predictedDate[i][0])
        dateData.append(date.getDate(),'/',date.getMonth(),'/',date.getFullYear())
        newConfirmedData.append(Math.ceil(predictedDate[i][1]))
        tableRow.append(CounterData)
        tableRow.append(dateData)
        tableRow.append(newConfirmedData)
        $(tableClassName).prepend(tableRow)
    }
}




constructConfirmedGraph()