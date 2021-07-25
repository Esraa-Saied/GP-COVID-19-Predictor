var helpFlag = false;
//var isCntent = false;
var isDesc = false;
var isTable = true;


var tesData = []
var wholeData = wholeData
var continent =continent
console.log("continent"+continent)
var redundantCountriesName =countriesName
var countriesName = [...new Set(redundantCountriesName)];
console.log( countriesName)
countrySelector(countriesName)

//console.log(countriesName)
//for (var i = 1 ; i < 4000 ; i++){
//
//   tesData.push(wholeData[i])
//}
//wholeData = tesData
/**********/


/*** Create Element Func  ***/
function create_td_Element(text){

    var content
    var node = document.createElement("td")

     if(text==""){
        content=document.createTextNode("0");

     }
     else{
       content=document.createTextNode(text);

     }
     node.appendChild(content)

     return node
}
/****** Create Select Element ****/

function createOption(txt){
    var content=document.createTextNode(txt)
    var node = document.createElement("option")
    node.value=txt

    node.appendChild(content)
    return node


}

function countrySelector(countriesName){
   var select = document.getElementById("select")
   var country_Select = document.getElementById("country-Select")
   //var respect1 = document.getElementById("respect1")
   //var respect3 = document.getElementById("respect3")
   //var ratio = document.getElementById("ratio")
   for(var i = 0 ; i < countriesName.length ; i++){

     select.appendChild(createOption(countriesName[i]))
     country_Select.appendChild(createOption(countriesName[i]))
     //respect1.appendChild(createOption(countriesName[i]))
     //respect3.appendChild(createOption(countriesName[i]))
     //ratio.appendChild(createOption(countriesName[i]))

   }

}



/******* Choosen Countryt ********/


/***** Build Table Func *****/

function buildTable(dataArr){
document.getElementById("tableHead").innerHTML=""
document.getElementById("tableHead").innerHTML=`

 <th>Country</th>
 <th>Date</th>
 <th>Death</th>
 <th>Confirmed</th>
 <th>Recovered</th>`
 var table = document.querySelector("#tableBody");
  table.innerHTML = ''/* to remove body created by buildCntientTable func*/
   for(var i=0 ; i < dataArr.length ; i++){
   console.log("tablllllllllle")
       var tr = document.createElement("tr")
       var td_location =create_td_Element(dataArr[i].fields.location)
       var td_date =create_td_Element(dataArr[i].fields.date)
       var td_death =create_td_Element(dataArr[i].fields.new_deaths)
       var td_confirmed =create_td_Element(dataArr[i].fields.new_cases)
       var td_recovered =create_td_Element(dataArr[i].fields.new_recovery)
        tr.appendChild(td_location)
        tr.appendChild(td_date)
        tr.appendChild(td_death)
        tr.appendChild(td_confirmed)
        tr.appendChild(td_recovered)
        table.appendChild(tr)

 }

//$('#type').attr('data-type').value='country'
  $('#type').attr('data-type', "country")
console.log("$('#type').attr('data-type').value"+$('#type').attr('data-type'))
isTable = false
}

  function buildTableContinent(dataArr){

  document.getElementById("tableHead").innerHTML=""
document.getElementById("tableHead").innerHTML=`

 <th>Continent</th>
 <th>Date</th>
 <th>Death</th>
 <th>Confirmed</th>
 <th>Recovered</th>`
 var table = document.querySelector("#tableBody");

  table.innerHTML = ''/* to remove body created by buildCntientTable func*/
   for(var i=0 ; i < dataArr.length ; i++){
   console.log("continent")
       var tr = document.createElement("tr")
       var td_continent =create_td_Element(dataArr[i].fields.continent)
       var td_date =create_td_Element(dataArr[i].fields.date)
       var td_death =create_td_Element(dataArr[i].fields.deaths)
       var td_confirmed =create_td_Element(dataArr[i].fields.cases)
       var td_recovered =create_td_Element(dataArr[i].fields.recovery)
        tr.appendChild(td_continent)
        tr.appendChild(td_date)
        tr.appendChild(td_death)
        tr.appendChild(td_confirmed)
        tr.appendChild(td_recovered)
        table.appendChild(tr)

 }
 //$('#type').attr('data-type').value='contient'
  $('#type').attr('data-type', "contient")
isTable = true



  }
/****** Filter By Country Name ********/
function filterByCountry(list,country){
  var date =[]
  var new_cases =[]
  var new_deaths =[]
  var new_recover =[]
  var total_cases =[]
  var total_deaths =[]
  var total_recover =[]
  var filteredvar = list.filter( function(obj){
           var location = obj.fields.location
           if( location == country){
              date.push(obj.fields.date)
              new_cases.push(obj.fields.new_cases)
              new_deaths.push(obj.fields.new_deaths)
              new_recover.push(obj.fields.new_recovery)
              total_cases.push(obj.fields.total_cases)
              total_deaths.push(obj.fields.total_deaths)
              total_recover.push(obj.fields.total_recovery)


           }

  }
  )
  return{
     date,
     new_cases ,
     new_deaths,
     new_recover,
     total_cases,
     total_deaths,
     total_recover
         }
}





 /*** show help ***/
 function showHelp(){

   if(helpFlag == false){
      document.getElementById("helpdiv").style="display:block;";
      helpFlag=true;
   }
   else{
    document.getElementById("helpdiv").style="display:non;";
      helpFlag=false;

   }
 }
 /*** Switch countries/ continents ****/
 function changeGlobal(){

    if (isTable == true) {
          buildTable(wholeData)
       document.getElementById('date-picker').value=""
       document.getElementById("country-t").style="display:block;";



    } else {
       buildTableContinent(continent)

       document.getElementById('date-picker').value=""
       document.getElementById("country-t").style="display:none;";

    }}
 /**** Sort Asecnding / Descending  ******/

 function sort() {
 var arr
 var order = $('#sortBt').attr('data-order');
 if(isTable == false){
 arr = wholeData


 }
 else{
 arr = continent
 }
 if (order == 'desc') {
        $('#sortBt').attr('data-order', "asc")
        arr = arr.sort((a, b) => (a.fields.date > b.fields.date) ? 1 : -1)
   }
   else {
        $('#sortBt').attr('data-order', "desc")
        arr = arr.sort((a, b) => (a.fields.date < b.fields.date) ? 1 : -1)


   }
   if(isTable == false){

 buildTable(arr)


 }
 else{
 buildTableContinent(arr)

 }

 }

 /********* Filter Table By Date  *******/
 function filterTable(){
  var inputDate= new Date(document.getElementById("date-picker").value)
  var dataDate
  var filteredData =[]

  if (isTable == false){
    for(var i=0 ; i < wholeData.length ; i++){
    dataDate=new Date(wholeData[i].fields.date);

     if(dataDate.getTime() === inputDate.getTime()){/dataDate.setHours(0,0,0,0)== inputDate.setHours(0,0,0,0)/
       filteredData.push(wholeData[i])


       }}

  }
  else{

     for(var i=0 ; i < continent.length ; i++){
    dataDate=new Date(continent[i].fields.date);

     if(dataDate.getTime() === inputDate.getTime()){/dataDate.setHours(0,0,0,0)== inputDate.setHours(0,0,0,0)/
       filteredData.push(continent[i])


       }}
  }

  if(filteredData.length == 0 ){
   alert("There is no info about this date.")

  }else{
  if (isTable == false){
   console.log('filteredData[0]')
      console.log(filteredData[0])
  buildTable(filteredData)

  }
  else{

  buildTableContinent(filteredData)
  }



  }

 }
/**********************/

/********  Country Chart Func   ********/



function configGraph(confirmed,death,recovered) {
    config = {
        tooltip: {
            xDateFormat: '%Y/%m/%d',
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
            text: ''
        },
        subtitle: {
            text: ''
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        xAxis: {
            type: 'datetime',
            plotLines: [{
                color: '#181414',
                width: 2,
                value: confirmed[0][0],
                dashStyle: 'ShortDot'
            }]
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            x: 0,
            y: 0
        },
        series: [{
            name: "Confirmed",
            data: confirmed,
            color: 'blue',
        },
            {
                name: "Death",
                data: death,
                dashStyle: 'longdash',
                color: 'red'
            },
            {
                name: "Recover",
                data: recovered,
                dashStyle: 'longdash',
                color: 'green'
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



function callCountryChart(){
 var country = document.getElementById("country-Select").value
// var countryData=getCountryData(country)
// var splited = splitCountryData(countryData)
   var splited = filterByCountry(wholeData,country)
// var name = splited.name
 var dates = splited.date
 var death = splited.new_deaths
 var confirmed = splited.new_cases
 var recovered = splited.new_recover

var paired = pairs(dates,confirmed,death,recovered)
 var confirmedP = paired.confirmedP
var deathP= paired.deathP
var recoveredP= paired.recoveredP
// countryChart(dates,confirmed,death,recovered)
 console.log("hi country chart"+dates[0])
 Highcharts.chart('containerChart', configGraph(confirmedP,deathP,recoveredP));


}
/***********/
/***** put data as pairs to plot   ********/
function pairs(dates,confirmed,death,recovered){

var confirmedP=[]
var deathP=[]
var recoveredP=[]
for (let i = 0; i < dates.length; i++) {
        confirmedP.push([new Date(dates[i]).getTime(), confirmed[i]])
        deathP.push([new Date(dates[i]).getTime(),  death[i]])
        recoveredP.push([new Date(dates[i]).getTime(), recovered[i]])

    }

return{
confirmedP,
deathP,
recoveredP

}
}
function toUnix(dates){
var new_dates=  []
for(var i = 0 ; i < dates.length ; i++){
date = new Date(dates[i]).getTime() / 1000

new_dates.push(date)

}
console.log("tounix")
return new_dates
}

 function showTable(){

    document.getElementById("charts").style="display:none;";
    document.getElementById("MyTable").style="display:block;";
    document.getElementById("title_display_none").style="display:row;";
    document.getElementById("icons_display_none").style="display:row;";
    document.getElementById("empty_display_block").style="display:none;";
    document.getElementById("selectors").style=" visibility:hidden;";
    document.getElementById('date-picker').value=""

   // document.getElementById("filter_selector").style="display:none;";
    //document.getElementById("country_selector").style="display:none;";




 }

 function showGraph(){
    document.getElementById("charts").style="display:block;";
    document.getElementById("MyTable").style="display:none;";
    document.getElementById("title_display_none").style="display:none;";
    document.getElementById("icons_display_none").style="display:none;";
    document.getElementById("empty_display_block").style="display:block;";
    document.getElementById("selectors").style=" visibility:visible;";
    document.getElementById("helpdiv").style=" display:none;";
   // document.getElementById("filter_selector").style="display:row;";
    //document.getElementById("country_selector").style="display:row;";



 }
 /****** get last cases *****/
 function lastCases(country){
  var data = filterByCountry(wholeData,country)
  var date = data.date
  var new_recover = data.new_recover
  var new_cases = data.new_cases
  var new_deaths = data.new_deaths
  var total_recover = data.total_recover
  var total_cases = data.total_cases
  var total_deaths = data.total_deaths
 var last_date = date[date.length-1]
 var last_new_recover = new_recover[date.length-1]
 var last_new_deaths = new_deaths[date.length-1]
 var last_new_cases = new_cases[date.length-1]
 var last_total_recover = total_recover[date.length-1]
 var last_total_deaths = total_deaths[date.length-1]
 var last_total_cases = total_cases[date.length-1]
// console.log("last_total_recover"+last_total_recover)
  return{
     last_date,
     last_new_recover,
     last_new_deaths,
     last_new_cases,
     last_total_recover,
     last_total_deaths,
     last_total_cases

  }


 }
//

function setUpchoosenCountryInMap(country){
    var countryInfo =lastCases(country)
    showdate =countryInfo.last_date
    showconfirmed =countryInfo.last_new_cases
    showdeath =countryInfo.last_new_deaths
    showrecover =countryInfo.last_new_recover
    showtotalconfirmed =countryInfo.last_total_cases
    showtotaldeath =countryInfo.last_total_deaths
    showtotalrecover =countryInfo.last_total_recover
//    console.log("showtotalrecover"+showtotalrecover)
    document.getElementById("countryName").innerHTML=country
   document.getElementById("countryDate").innerHTML=showdate
   document.getElementById("countryNum").innerHTML=showconfirmed
   document.getElementById("countryState").innerHTML='Confirmed'
   document.getElementById("confirmedNum").innerHTML=showconfirmed
   document.getElementById("deathNum").innerHTML=showdeath
   document.getElementById("recoveredNum").innerHTML=showrecover
   document.getElementById("totalConfirmedNum").innerHTML=showtotalconfirmed
   document.getElementById("totalDeathNum").innerHTML=showtotaldeath
   document.getElementById("totalRecoveredNum").innerHTML=showtotalrecover
   changeMap('confirmed')


}
setUpchoosenCountryInMap('Afghanistan')
 /******************/

var splited = filterByCountry(wholeData,'Afghanistan')
var death = splited.new_deaths
var dates = splited.date
var confirmed = splited.new_cases
var recovered = splited.new_recover
var paired = pairs(dates,confirmed,death,recovered)
 var confirmedP = paired.confirmedP
var deathP= paired.deathP
var recoveredP= paired.recoveredP

/******** Call Functions  ********/

buildTable(wholeData)

Highcharts.chart('containerChart',configGraph(confirmedP,deathP,recoveredP));
//document.getElementById("test").src="/static/imgs/sun.png"

/***********************/