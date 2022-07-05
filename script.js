// WHEN I view current weather conditions for that city
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = '35d66511632e3718c5dcecf391dd5011'
var userSearch = "Austin"
var weatherAPIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
var geoAPIurl=`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`
//   var testUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
// Value from search form
var lat;
var lon;
$('#search-button').on('click', function(){
    var searchValue = $('#search-value').val()
    console.log(searchValue)
     getLatLon(searchValue)
})
// document.getElementById("#searchTerm").value
function getLatLon(userSearch){

fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`)
.then(function(response){
    
    return response.json();

}).then(function(data){
    console.log(data);
    console.log("lat",data[0].lat)
    console.log("lon",data[0].lon)
   
    currentForecast(data[0].lat,data[0].lon);
    fiveDayForcast(data[0].lat,data[0].lon);
})
};

function currentForecast(lat,lon){
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
.then(function(response){
return response.json();
}).then(function(data){
    console.log(data);
    // APPEND TO PAGE   
var weatherCard = document.createElement('div')
weatherCard.setAttribute('class','card')
var searchValue = document.createElement('h2')
searchValue.textContent=document.getElementById('search-value').value
var currentDate = document.createElement('h3')
currentDate.textContent=moment.unix(data.current.dt).format('(MM/DD/YYYY')

var currentTemp = document.createElement('h3')
currentTemp.textContent='temp:' + data.current.temp

   
    


weatherCard.append(searchValue,currentDate,currentTemp)
    document.getElementById('todayweather').append(weatherCard)
})
};



function fiveDayForcast(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data);

for(var i = 0; i < data.daily.length-3; i++){
    var weatherCard = document.createElement('div')
    weatherCard.setAttribute('class','card')
    
    var currentDate = document.createElement('h3')
    currentDate.textContent=moment.unix(data.daily[i].dt).format('(MM/DD/YYYY')
    
    var currentTemp = document.createElement('p')
    currentTemp.textContent='temp:' + data.daily[i].temp.day
    
       
        
    
    
    weatherCard.append(currentDate,currentTemp)
        document.getElementById('fiveforecast').append(weatherCard)


}



        // APPEND TO PAGE   
    
    })
    };