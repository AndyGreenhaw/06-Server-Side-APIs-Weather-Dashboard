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

var weatherIcon;
var tempNow;
var humidNow;
var windNow;
var latC;
var lonC;
var uvIndex;

/////////////////////////////////////
// LINK HTML SECTIONS TO VARIABLES //
/////////////////////////////////////

var headDiv = $("#head");
var primarySection = $("#primary");
var forecastSection = $("#forecast");
var searchSection = $("#search");
var recentSearchSection = $("#navBar");
var bodySection = $("#body");

//////////////////////////
// Lay Down a Header //
//////////////////////////

var heroHeadline = $("<h1>").text("Weather Dashboard");
headDiv.append(heroHeadline);

//////////////////////////
// BUILD SEARCH SECTION //
//////////////////////////

// Set Up Array for Recent Searches
var recentSearchArray = [];
console.log(recentSearchArray);

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

    //Send User Entries to First Ajax Function and Push to Recent Search Array//
    var recentSearch = $(this).siblings("#searchInput").val();
    recentSearchArray.push(recentSearch);
    ajaxRequest = $(this).siblings("#searchInput").val();

        //Create List of Buttons with Recent Searches
        for( var i=0 ; i<recentSearchArray.length ; i++){
            var recentSearchButton = $("<button>").attr("id", "recentSearchButton").text(recentSearchArray[i]);
            recentSearchSection.append(recentSearchButton);
        }

////////////////////////////////////
// GET AJAX WEATHER DATA FOR CITY //
////////////////////////////////////

    // Place Ajax Request in Query URL
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + ajaxRequest + "&appid=" + apiKey;

    $.ajax({
    url: queryURL,
    method: "GET"

    }).then(function(response) {

        // Collect Weather Icon, Temperature, Humidity and Wind Speed
        weatherIcon = response.weather[0].icon;
        tempNow = response.main.temp;
        humidNow = response.main.humidity;
        windNow = response.wind.speed;

        // Send Data to Local Storage
        localStorage.setItem("weatherIcon", JSON.stringify(weatherIcon));
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

        });
    
    });

};
    
/////////////////////////////////
// CREATE PRIMARY WEATHER PAGE //
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

var cityHeadline = $("<h2>");

if(ajaxRequest=""){
    cityHeadline.text(ajaxRequest);
} else if(ajaxRequest = null){
    cityHeadline = storedCIty;
    cityHeadline.textContent;
};


// $("div.something h1").text("hello").addClass("classname")


primarySection.append(cityHeadline);
console.log(cityHeadline);
// primarySection.

});