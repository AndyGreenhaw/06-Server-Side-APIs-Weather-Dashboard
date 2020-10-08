$(document).ready(function(){
////////////////////////////////
// ESTABLISH API INFO AND CITY//
////////////////////////////////

var city = "Denver";
var apiKey = "e7d65f8500681df1e3559a6964e703f1";

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

var headDiv = $("#head");
var primarySection = $("#primary");
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

var heroHeadline = $("<h1>").text("Weather Dashboard");
headDiv.append(heroHeadline);

//////////////////////////
// BUILD SEARCH SECTION //
//////////////////////////

// Create Search Headline, Input, and Button//
searchHeadline = $("<h3>").text("Search for a City:");
searchSection.append(searchHeadline);
searchInput = $("<input>").attr("id", "searchInput")
searchHeadline.after(searchInput);
var searchButton = $("<button>").text("S").attr("id", "searchButton");
searchInput.after(searchButton);

//When Search Button Clicked, Collect Input Entry
searchButton.on("click", searchButtonFunction);

function searchButtonFunction(e){
    e.preventDefault;

////////////////////////////////////
// GET AJAX WEATHER DATA FOR CITY //
////////////////////////////////////

    ajaxRequest = $("#searchInput").val();

    // Place Ajax Request in Query URL
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + ajaxRequest + "&units=imperial" + "&appid=" + apiKey;
    

    $.ajax({
    url: queryURL,
    method: "GET"     

    }).then(function(response) {
    console.log(ajaxRequest);
    console.log(response);

            // Set Up Array for Recent Searches
            var recentSearchArray = [];
            console.log(recentSearchArray);
                        recentSearchArray.push(ajaxRequest);
            console.log(ajaxRequest);

            //Create List of Buttons for Recent Searches
            for( var i=0 ; i<recentSearchArray.length ; i++){
                var recentSearchButton = $("<button>").attr("id", "recentSearchButton")
                recentSearchButton.text(recentSearchArray[i]);
                recentSearchSection.append(recentSearchButton);
                console.log(recentSearchArray[i])
            }

            $("#navBar").on("click", function(e){
                e.preventDefault;

                if (e.target.matches("button")){
                    ajaxRequest = e.target.textContent
                    console.log(ajaxRequest)
                    searchButtonFunction(e);
                };

            })

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
            var cityCoordinates = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latC + "&lon=" + lonC + "&appid=" + apiKey;

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

                // Set Dates
                //var currentDate = (moment().format("dddd, MMMM Do YYYY"));
                //console.log(currentDate)

                //Build Headline
                
                var cityHeadline = $("<h2>")
                cityHeadline.text(cityName)
                primarySection.append(cityHeadline);
                
                weatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + weatherIconCode + ".png")
                weatherIcon.attr("id", "weatherIcon");
                cityHeadline.after(weatherIcon)
                
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

///////////////////////////
// COLLECT FORECAST DATA //
///////////////////////////


            });

            // Place Ajax Request in Query URL
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial" + "&appid=" + apiKey;


            $.ajax({
            url: queryURL,
            method: "GET"     

            }).then(function(response) {
            console.log(ajaxRequest);
            console.log(response);

            allForecastIcons=[];
            allForecastTemps=[];
            allForecastHumidity=[];
            
            for(var i =0; i<6 ; i++){     
                allForecastTemps.push(response.list[i].main.temp);
                allForecastHumidity.push(response.list[i].main.humidity);
                allForecastIcons.push(response.list[i].weather[0].icon);
                }
            

//////////////////////////////////
// CREATE FORECAST WEATHER PAGE //
//////////////////////////////////

            for(var i=0; i<6; i++){

                day1Icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + allForecastIcons[i] + ".png")
                console.log(allForecastIcons[i])
                day1Icon.attr("class", "dailyIcons");
                $("#day"+ i) .append(day1Icon)

                day1Temp = $("<h5>")
                day1Temp.text("Temp: " + allForecastTemps[i] + "° F")
                $("#day" + i).append(day1Temp);
        
                day1Humidity = $("<h5>");
                day1Humidity.text("Humidity: " + allForecastHumidity[i] + "%");
                $("#day" + i).append(day1Humidity);

            };
            
        });


    });

};
    
/////////////////////////////////
// AUTO LOAD //
/////////////////////////////////

// Store Data from Local Storage Into Variables
var storedCity = JSON.parse(localStorage.getItem("cityName"));
console.log(storedCity);
var storedWeatherNow = JSON.parse(localStorage.getItem("weatherIcon"));
console.log(storedWeatherNow);
var storedTempNow = JSON.parse(localStorage.getItem("tempNow"));
console.log(storedTempNow);
var storedHumidNow = JSON.parse(localStorage.getItem("humidNow"));
console.log(storedHumidNow);
var storedWindNow = JSON.parse(localStorage.getItem("windNow"));
console.log(storedWindNow);
var storedUVNow = JSON.parse(localStorage.getItem("uvIndex"));
console.log(storedUVNow);



var openingCityHeadline = $("<h2>")
openingCityHeadline.text(storedCity)
primarySection.append(openingCityHeadline);

var openingweatherIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + storedWeatherNow + ".png")
openingweatherIcon.attr("id", "weatherIcon");
openingCityHeadline.after(openingweatherIcon)

var openingtempHeadline = $("<h4>");
openingtempHeadline.text("Temperature: " + storedTempNow + "° Fahrenheit");
tempDisplay.append(openingtempHeadline);
console.log(tempNow);

var openinghumidHeadline = $("<h4>");
openinghumidHeadline.text("Humidity: " + storedHumidNow + "%");
humidDisplay.append(openinghumidHeadline);
console.log(humidNow);

var openingwindHeadline = $("<h4>");
openingwindHeadline.text("Wind Speed: " + storedWindNow + "MPH");
windDisplay.append(openingwindHeadline);
console.log(uvIndex);

var openinguvHeadline = $("<h4>");
openinguvHeadline.text("UV Index: " + storedUVNow);
uvDisplay.append(openinguvHeadline);
console.log(uvIndex);




cityHeadline
weatherIcon
tempHeadline

});