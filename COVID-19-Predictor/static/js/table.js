var wholeData = wholeData
console.log(wholeData.length)
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
//  $('#type').attr('data-type', "country")
//console.log("$('#type').attr('data-type').value"+$('#type').attr('data-type'))
//isTable = false
}

buildTable(wholeData)