var isDark = false;


console.log("scrrrrript"+script)
    function darkTheme(){
   document.body.style.backgroundColor="#161625";
   document.body.style.color="#A89F9F";
   document.getElementsByTagName("header")[0].style.backgroundColor="#232336";
   document.getElementsByTagName("hr")[0].style.backgroundColor="#A89F9F";
   document.getElementsByTagName("table")[0].style.backgroundColor="#232336";
   document.getElementById("select").style.backgroundColor="#232336";
   document.getElementById("country-Select").style.backgroundColor="#232336";
   document.getElementById("date-picker").style.backgroundColor="#232336";
   document.getElementsByTagName("table")[0].style.backgroundColor="#232336";
   document.getElementsByTagName("thead")[0].style.color="#FFF";
   document.getElementsByTagName("tbody")[0].style.color="#FFF";
   document.getElementById("countryDate").style.color="#A89F9F";

}
function lightTheme(){
   document.body.style.backgroundColor="#FFF";
   document.body.style.color="#000";
   document.getElementsByTagName("header")[0].style.backgroundColor="#949494";
   document.getElementsByTagName("hr")[0].style.backgroundColor="#000";
   document.getElementsByTagName("table")[0].style.backgroundColor="#949494";
   document.getElementById("select").style.backgroundColor="#949494";
   document.getElementById("countryDate").style.color="black";
   //document.getElementById("respect1").style.backgroundColor="#FFF";
   //document.getElementById("respect3").style.backgroundColor="#FFF";
  // document.getElementById("ratio").style.backgroundColor="#FFF";
   document.getElementById("country-Select").style.backgroundColor="#FFF";
  // document.getElementById("mySelect").style.backgroundColor="#FFF";
   document.getElementById("date-picker").style.backgroundColor="#949494";
   document.getElementsByTagName("table")[0].style.backgroundColor="";
   document.getElementsByTagName("thead")[0].style.color="";
   document.getElementsByTagName("tbody")[0].style.color="";


}

function switchMode(){
   if(isDark == false){
   document.getElementById("mode-btn").src="/static/imgs/sun.png";

      if (script == 1){
      console.log("script1 dark")
      darkTheme();

      console.log("isDark"+isDark);
      }
      if (script == 2){
      console.log("script2 dark")
      predictionDarkTheme();
      console.log("script2 dark")


      }
      if(script==3){
      console.log("script3 dark")
      xrayDarkTheme();
      console.log("script3 dark")
      }
      isDark = true;

   }

   else{
   document.getElementById("mode-btn").src="/static/imgs/moon.png";
   if (script == 1){

      lightTheme();

   }
   if(script == 2){
   predictionLightTheme();
   }
   if(script==3){
   xrayLightTheme();
   }
    isDark = false;
   }
}



    function predictionDarkTheme(){
document.body.style.backgroundColor="#161625";
   document.body.style.color="#A89F9F";
   document.getElementsByTagName("header")[0].style.backgroundColor="#232336";
   document.getElementById("card-Confirmed").style.backgroundColor="#161625";
   document.getElementById("card-Death").style.backgroundColor="#161625";
   document.getElementById("Confirmed").style.backgroundColor="#161625";
   document.getElementById("Death").style.backgroundColor="#161625";
   document.getElementById("Recovered").style.backgroundColor="#161625";
   document.getElementById("container").style.backgroundColor="#161625";
   document.getElementById("card-recovered").style.backgroundColor="#161625";
   document.getElementsByTagName("hr")[0].style.backgroundColor="#A89F9F";
   document.getElementsByClassName("container-fluid")[0].style.backgroundColor="#161625";
   document.getElementsByClassName("container-fluid")[1].style.backgroundColor="#161625";
   document.getElementsByClassName("container-fluid")[2].style.backgroundColor="#161625";
   document.getElementsByTagName("table")[0].style.backgroundColor="#232336";
   document.getElementsByTagName("table")[1].style.backgroundColor="#232336";
   document.getElementsByTagName("table")[2].style.backgroundColor="#232336";
   document.getElementsByTagName("thead")[0].style.color="#FFF";
   document.getElementsByTagName("thead")[1].style.color="#FFF";
   document.getElementsByTagName("thead")[2].style.color="#FFF";
   document.getElementsByTagName("tbody")[0].style.color="#FFF";
   document.getElementsByTagName("tbody")[1].style.color="#FFF";
   document.getElementsByTagName("tbody")[2].style.color="#FFF";

}
function predictionLightTheme(){
    document.body.style.backgroundColor="#FFF";
   document.body.style.color="#000";
   document.getElementsByTagName("header")[0].style.backgroundColor="#949494";
   document.getElementById("card-Confirmed").style.backgroundColor="#FFF";
   document.getElementById("card-Death").style.backgroundColor="#FFF";
   document.getElementById("Confirmed").style.backgroundColor="#f7f7f7";
   document.getElementById("Death").style.backgroundColor="#f7f7f7";
   document.getElementById("Recovered").style.backgroundColor="#f7f7f7";
    document.getElementById("container").style.backgroundColor="";
    document.getElementById("card-recovered").style.backgroundColor="";
   document.getElementsByTagName("hr")[0].style.backgroundColor="#f7f7f7";
   document.getElementsByClassName("container-fluid")[0].style.backgroundColor="#FFF";
   document.getElementsByClassName("container-fluid")[1].style.backgroundColor="#FFF";
   document.getElementsByClassName("container-fluid")[2].style.backgroundColor="#FFF";
   document.getElementsByTagName("table")[0].style.backgroundColor="";
   document.getElementsByTagName("table")[1].style.backgroundColor="";
   document.getElementsByTagName("table")[2].style.backgroundColor="";
   document.getElementsByTagName("thead")[0].style.color="";
   document.getElementsByTagName("thead")[1].style.color="";
   document.getElementsByTagName("thead")[2].style.color="";
   document.getElementsByTagName("tbody")[0].style.color="";
   document.getElementsByTagName("tbody")[1].style.color="";
   document.getElementsByTagName("tbody")[2].style.color="";

}


    function xrayDarkTheme(){
   document.body.style.backgroundColor="#161625";
   document.body.style.color="#A89F9F";
   document.getElementsByTagName("header")[0].style.backgroundColor="#232336";

}
function xrayLightTheme(){
   document.body.style.backgroundColor="#FFF";
   document.body.style.color="#000";
   document.getElementsByTagName("header")[0].style.backgroundColor="#949494";
}

function startTheme(){

if(isDark == false){
switchMode()
isDark = true
}
else{
switchMode()
isDark = false
}

}