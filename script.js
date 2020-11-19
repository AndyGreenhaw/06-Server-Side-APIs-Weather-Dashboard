$(document).ready(function(){
////////////////////////////////
// ESTABLISH API INFO AND CITY//
////////////////////////////////

var city = "Denver";
var apiKey = "e7d65f8500681df1e3559a6964e703f1";
var apiKeyGPlaces = "AIzaSyAKHWOvN9T62JBiCFcnwoIDCJB0jZfxnJk";


////////////////////
// ESTABLISH TIME //
////////////////////

var todayFullDate = new Date();
console.log(todayFullDate)

var dd = todayFullDate.getDate();
var mm = todayFullDate.getMonth();
var yyyy = todayFullDate.getFullYear();
var dayName = todayFullDate.getDay();

// Format Days


switch(dayName) {
    case 0:
        dayName = "Sunday";
        break;
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6: 
        dayName = "Saturday";
}

// Format Months
switch(mm) {
    case 0:
        mm = "Jan";
        break;
    case 1:
        mm = "Feb";
        break;
    case 2:
        mm = "March";
        break;
    case 3:
        mm = "April";
        break;
    case 4:
        mm = "May";
        break;
    case 5:
        mm = "June";
        break;
    case 6: 
        mm = "July";
        break;
    case 7:
        mm = "Aug";
        break;
    case 8:
        mm = "Sept";
        break;
    case 9:
        mm = "Oct";
        break;
    case 10:
        mm = "Nov";
        break;
    case 11:
        mm = "Dec";
} 

todayDisplay = dayName+', '+mm+' '+dd+', '+yyyy;
console.log(todayDisplay)
// today = mm+'/'+dd+'/'+yyyy;
// console.log(today);
// today = dd+'-'+mm+'-'+yyyy;
// console.log(today);
// today = dd+'/'+mm+'/'+yyyy;
// console.log(today);

///////////////////////////////
// ESTABLISH GLOBAL VARIABLES//
///////////////////////////////

var ajaxRequest;

var weatherIconCode;
var weatherIcon;
var tempNow;
var humidNow;
var windNow;
var latC;
var lonC;
var uvIndex;

var currentDate;

/////////////////////////////////////
// LINK HTML SECTIONS TO VARIABLES //
/////////////////////////////////////

var backgroundImage = $("#html")
var headDiv = $("#head");
var primarySection = $("#primary");
var date = $("#date");
var forecastSection = $("#forecast");
var searchSection = $("#search");
var recentSearchSection = $("#navBar");
var bodySection = $("#body");
var tempDisplay = $("#tempDisplay");
var humidDisplay = $("#humidDisplay");
var windDisplay = $("#windDisplay");
var uvDisplay = $("#uvIndexDisplay");
var day1 = $("#day1")
var day2 = $("#day2")
var day3 = $("#day3")
var day4 = $("#day4")
var day5 = $("#day5")

//////////////////////////
// Lay Down a Header //
//////////////////////////

var heroHeadline = $("<h1>").text("ANDY'S WEATHER APP");
headDiv.append(heroHeadline);

//////////////////////////
// BUILD SEARCH SECTION //
//////////////////////////

var searchArray = [];

// Create Search Headline, Input, and Button//
searchHeadline = $("<h3>").text("Search by City:");
searchSection.append(searchHeadline);
searchInput = $("<input>").attr("id", "searchInput").attr("placeholder", "Enter City")
searchHeadline.after(searchInput);
var searchButton = $("<button>").attr("id", "searchButton");
searchInput.after(searchButton);

//When Search Button Clicked, Collect Input Entry

searchButton.on("click", searchClick);

function searchClick(e) {
    e.preventDefault;
    
    ajaxRequest = $("#searchInput").val();
    
    // switch(ajaxRequest) {
    //     case "Denver":
    //         html.style.background = "url('./images/background/day/denver-day.jpg')";
    //         break;
    //     case "Lawrence":
    //         html.style.background = "url('./images/background/day/lawrence-day.jpg')";
            
    // }

    searchButtonFunction()
}

$("#navBar").on("click", recentSearchClick);
    

function recentSearchClick(e) {
    
        ajaxRequest = e.target.textContent
        console.log(ajaxRequest)
    
    searchButtonFunction()
}


function searchButtonFunction(e){
    // e.preventDefault;

////////////////////////////////////
// GET AJAX WEATHER DATA FOR CITY //
////////////////////////////////////

    // Place Ajax Request in Query URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + ajaxRequest + "&units=imperial" + "&appid=" + apiKey;
    
    $.ajax({
    url: queryURL,
    method: "GET"     

    }).then(function(response) {
    console.log(ajaxRequest);
    console.log(response);

       
        var recentSearchButton = $("<button>").attr("id", "recentSearchButton")
        recentSearchButton.text(ajaxRequest);
        recentSearchSection.append(recentSearchButton);

        // Collect Weather Icon, Temperature, Humidity and Wind Speed
        cityName = ajaxRequest;
        weatherIconCode = response.weather[0].icon;
        tempNow = response.main.temp;
        humidNow = response.main.humidity;
        windNow = response.wind.speed;

        // Send Data to Local Storage
        localStorage.setItem("weatherIconCode", JSON.stringify(weatherIconCode));
        localStorage.setItem("tempNow", JSON.stringify(tempNow));
        localStorage.setItem("humidNow", JSON.stringify(humidNow));
        localStorage.setItem("windNow", JSON.stringify(windNow));
        localStorage.setItem("cityName", JSON.stringify(ajaxRequest));

        //Collect City Coordinates for for Second Ajax Request to GET UV Index
        latC = response.coord.lat;
        lonC = response.coord.lon;

        // Set Up Request for UV Index at City Coordinates
        var cityCoordinates = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latC + "&lon=" + lonC + "&appid=" + apiKey;

        $.ajax({
            url: cityCoordinates,
            method: "GET"
        
            }).then(function(response) {
            
            // Collect UVIndex and Send to Storage
            uvIndex = response.value;
            localStorage.setItem("uvIndex", JSON.stringify(uvIndex));

/////////////////////////////////////
// CREATE PRIMARY ELEMENTS OF PAGE //
/////////////////////////////////////

            primarySection.empty()
            date.empty()
            tempDisplay.empty()
            humidDisplay.empty()
            windDisplay.empty()
            uvDisplay.empty()
            
            var cityHeadline = $("<h2>")
            cityHeadline.text(cityName)
            primarySection.append(cityHeadline);
            
            weatherIcon = $("<img>").attr("src", "./images/weatherIcons/" + weatherIconCode + "@2x.png")
            weatherIcon.attr("id", "weatherIcon");
            cityHeadline.append(weatherIcon)

            var todayDateDisplay = $("<h3>")
            todayDateDisplay.text(todayDisplay)
            date.append(todayDateDisplay);
            
            var tempHeadline = $("<h4>");
            tempHeadline.text("Temperature: " + tempNow + "° Fahrenheit");
            tempDisplay.append(tempHeadline);
            console.log(tempNow);

            var humidHeadline = $("<h4>");
            humidHeadline.text("Humidity: " + humidNow + "%");
            humidDisplay.append(humidHeadline);
            console.log(humidNow);

            var windHeadline = $("<h4>");
            windHeadline.text("Wind Speed: " + windNow + "MPH");
            windDisplay.append(windHeadline);
            console.log(uvIndex);

            var uvHeadline = $("<h4>");
            uvHeadline.text("UV Index: " + uvIndex);
            uvDisplay.append(uvHeadline);
            console.log(uvIndex);
 
            });

///////////////////////////
// COLLECT FORECAST DATA //
///////////////////////////

            // Place Ajax Request in Query URL
            var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + apiKey;

            day1.empty()
            day2.empty()
            day3.empty()
            day4.empty()
            day5.empty()

            $.ajax({
            url: queryURL,
            method: "GET"     

            }).then(function(response) {
            console.log(ajaxRequest);
            console.log(response);

            var allForecastIcons=[];
            var allForecastTemps=[];
            var allForecastHumidity=[];
            
            for(var i =0; i<6 ; i++){     
                
                allForecastTemps.push(response.list[i].main.temp);
                allForecastHumidity.push(response.list[i].main.humidity);
                allForecastIcons.push(response.list[i].weather[0].icon);

//////////////////////////////////
// CREATE FORECAST WEATHER PAGE //
//////////////////////////////////

                var forecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + allForecastIcons[i] + ".png")
                console.log(allForecastIcons[i])
                forecastIcon.attr("class", "dailyIcons");
                $("#day"+ i) .append(forecastIcon)

                var forecastTemp = $("<h5>")
                forecastTemp.text("Temp: " + allForecastTemps[i] + "° F")
                $("#day" + i).append(forecastTemp);
        
                var forecastHumidity = $("<h5>");
                forecastHumidity.text("Humidity: " + allForecastHumidity[i] + "%");
                $("#day" + i).append(forecastHumidity);

            };
            
        });


    });

};
    
///////////////
// AUTO LOAD //
///////////////

// Get Data from Local Storage Into Variables
var storedCity = JSON.parse(localStorage.getItem("cityName"));
console.log(storedCity);

var autoURL = "https://api.openweathermap.org/data/2.5/weather?q=" + storedCity + "&units=imperial" + "&appid=" + apiKey;

$.ajax({
    url: autoURL,
    method: "GET"     

    }).then(function(response) {

        // Collect Weather Icon, Temperature, Humidity and Wind Speed
        storedWeatherNow = response.weather[0].icon;
        storedTempNow = response.main.temp;
        storedHumidNow = response.main.humidity;
        storedWindNow = response.wind.speed; 

        //Collect City Coordinates for for Second Ajax Request to GET UV Index
        latC = response.coord.lat;
        lonC = response.coord.lon;

        // Set Up Request for UV Index at City Coordinates
        var cityCoordinates = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latC + "&lon=" + lonC + "&appid=" + apiKey;

    $.ajax({
        url: cityCoordinates,
        method: "GET"

        }).then(function(response) {

            // Collect UVIndex
            storedUVNow = response.value;

            var openingCityHeadline = $("<h2>")
            openingCityHeadline.text(storedCity)
            primarySection.append(openingCityHeadline);

            var openingweatherIcon = $("<img>").attr("src", "./images/weatherIcons/" + storedWeatherNow + "@2x.png")
            console.log("STN " + storedWeatherNow)
            openingweatherIcon.attr("id", "weatherIcon");
            openingCityHeadline.append(openingweatherIcon)

            var todayDateDisplay = $("<h3>")
            todayDateDisplay.text(todayDisplay)
            date.append(todayDateDisplay);

            var openingtempHeadline = $("<h4>");
            openingtempHeadline.text("Temperature: " + storedTempNow + "° Fahrenheit");
            tempDisplay.append(openingtempHeadline);

            var openinghumidHeadline = $("<h4>");
            openinghumidHeadline.text("Humidity: " + storedHumidNow + "%");
            humidDisplay.append(openinghumidHeadline);

            var openingwindHeadline = $("<h4>");
            openingwindHeadline.text("Wind Speed: " + storedWindNow + "MPH");
            windDisplay.append(openingwindHeadline);

            var openinguvHeadline = $("<h4>");
            openinguvHeadline.text("UV Index: " + storedUVNow);
            uvDisplay.append(openinguvHeadline);

        })

    })

///////////////////////////
// COLLECT FORECAST DATA //
///////////////////////////

    // Place StoredCity Request in Query URL
    var autoForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + storedCity + "&units=imperial" + "&appid=" + apiKey;

    day1.empty()
    day2.empty()
    day3.empty()
    day4.empty()
    day5.empty()

    $.ajax({
    url: autoForecastURL,
    method: "GET"     

    }).then(function(response) {

        var storedForecastIcons=[];
        var storedForecastTemps=[];
        var storedForecastHumidities=[];
    
        for(var i =0; i<6 ; i++){     
            
            storedForecastTemps.push(response.list[i].main.temp);
            storedForecastHumidities.push(response.list[i].main.humidity);
            storedForecastIcons.push(response.list[i].weather[0].icon);

        //////////////////////////////////
        // CREATE FORECAST WEATHER PAGE //
        //////////////////////////////////

            storedForecastIcon = $("<img>").attr("src", "https://openweathermap.org/img/w/" + storedForecastIcons[i] + ".png")

            
            console.log(storedForecastIcons[i])
            storedForecastIcon.attr("class", "dailyIcons");
            $("#day"+ i) .append(storedForecastIcon)

            storedForecastTemp = $("<h5>")
            storedForecastTemp.text("Temp: " + storedForecastTemps[i] + "° F")
            $("#day" + i).append(storedForecastTemp);

            storedForecastHumidity = $("<h5>");
            storedForecastHumidity.text("Humidity: " + storedForecastHumidities[i] + "%");
            $("#day" + i).append(storedForecastHumidity);
        }

    })

})
