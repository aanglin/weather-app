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
var searchValue;
var savedButton = document.getElementById('#search-button');
var searchHistory = JSON.parse(localStorage.getItem('cityList'))||[]
$('#search-button').on('click', function(){
     searchValue = $('#search-value').val()
     console.log(searchValue)
     
    
     getLatLon(searchValue)
    
     return
})

function getLatLon(userSearch){

if(searchHistory.indexOf(userSearch)=== -1){
    searchHistory.push(userSearch)
    localStorage.setItem('cityList',JSON.stringify(searchHistory));
    $('#list-group').append('<li>'+'<a href="#"> '+ searchValue + '</a>'+'</li>')
    
};
document.getElementById('todayWeather').innerHTML=''
document.getElementById('fiveForecast').innerHTML=''
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
weatherCard.setAttribute('class','card1')
var searchValue = document.createElement('h2')
searchValue.textContent=document.getElementById('search-value').value
var currentDate = document.createElement('h3')
currentDate.textContent=moment.unix(data.current.dt).format('(MM/DD/YYYY')

var currentTemp = document.createElement('h3')
currentTemp.textContent='temp:' + data.current.temp +'°F'

var currentWind = document.createElement('h3')
currentWind.textContent='wind' + data.current.wind_speed + ' MPH'

var humidity = document.createElement('h3')
humidity.textContent='humidity' + data.current.humidity + ' %'

var currentUv = document.createElement('h3')
currentUv.textContent='UV Index' +data.current.uvi
   
    


weatherCard.append(searchValue,currentDate,currentTemp,currentWind,humidity,currentUv)
    document.getElementById('todayWeather').append(weatherCard)
})
};



function fiveDayForcast(lat,lon){
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=imperial`)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data);
        

for(var i = 1; i < data.daily.length-2; i++){
    var weatherCard = document.createElement('div');
    weatherCard.setAttribute('class','card');
    
    var fiveDayDate = document.createElement('h3');
    fiveDayDate.textContent=moment.unix(data.daily[i].dt).format('(MM/DD/YYYY');
    
    var fiveDayTemp = document.createElement('h2')
    fiveDayTemp.textContent='temp:' + data.daily[i].temp.day + ' °F';
    
    
    var fiveDayWind = document.createElement('h4')
    fiveDayWind.textContent='Wind:' + data.daily[i].wind_speed +' MPH';

    var fiveDayHumidity = document.createElement('h4');
    fiveDayHumidity.textContent='Humidity:' + data.daily[i].humidity+ ' %';
    
    weatherCard.append(fiveDayDate,fiveDayTemp,fiveDayWind,fiveDayHumidity);
    document.getElementById('fiveForecast').append(weatherCard);

//   

}
    
    })
    };
    for(var i=0; i <searchHistory.length; i++){
        $('#list-group').append('<li>'+'<a href="#"> '+ searchHistory[i] + '</a>'+'</li>')
    }

    
// This function displays the last city entered on load of page
// function onPageLoad(){
//     getLatLon(searchHistory[searchHistory.length-1])
//     var searchValue = document.createElement('h2')
// searchValue.textContent=searchHistory[searchHistory.length-1]
// document.getElementById('todayWeather').append(searchValue)
// }
//  onPageLoad()