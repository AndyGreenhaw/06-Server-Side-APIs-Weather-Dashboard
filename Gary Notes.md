# 06-Server-Side-APIs-Weather-Dashboard
##### Unit 06 Homework Summary and Tips #########

1. The API Docs give you a way of doing a 16-day forecast for any area, but if you look at the docs closely enough you'll see you can specify the exact number of days you want the forecast for.
2. Break this app into key sections of work. I recommend something like this:
  a. Make sure you can retrieve data via the API for a city, both for the current day and a multi-day forecast (these may need to be two separate API calls)
  b. Determine how you'll manage the list of cities to the left. When a user enters a city name, after the response is received from OpenWeather, the city name should be added to the list. Be sure to prevent duplicates. You'll need to store the city list in local storage as well, so get that process figured out.
  c. When the user clicks on a city name, the API query should run again, just as if the user had typed the city in at the top. So maybe the city-typing and the city-clicking should both go to the same function for API lookup... ? 
  d. Each block if the 5-day forecast is the same thing, just with different data. So think about that.
3. Each of the sections above can be broken up into smaller sections as you see fit for work. Break things down as much as you need to. PSEUDOCODE!
4. You can always create your functions in advance and build your logic flow before you have the functionality finished. Use comments to help remind you what each function is supposed to do.
5. Console.logs are a great way to make sure you're working with the correct data at any point.


Homework API Fixes
Ok, so I don't know why my apiKey allows for a query that yours do not. I checked and mine is a free account also. All I can figure is that when my account was created maybe some things were available then that aren't now. Anyway, sorry for the confusion.
All of the info below was tested with the other api keys you folks provided, so I know it works.
1. You'll need to do 2 api calls. The first will get today's weather from whatever city is specified. That api call looks like this:  https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
2. Use this response to populate the current weather area. When you get the response, you'll need to also get the lat and lon values for that city, as you'll need them for the next part.
3. To get the mult-day forecast, the following api call is free and available to everyone, but it requires lat and lon values:   https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minute,hourly,alerts&appid=" + apiKey
4. In the url params above you'll see "exclude=current,minute,hourly,alerts" -- this just eliminates stuff from the final response you don't need. Modify as you see fit.
5. In the response to the query above, you should see how to get the daily data.
6. Finally, here's how you parse a UNIX date object (dt) into a real date:
   - Multiply the value by 1000 to get milliseconds
   - Create a new JS date object w/ the milliseconds value:  
        var dateObject = new Date(milliseconds);
   - Convert to human-readable:
        var humanDateFormat = dateObject.toLocaleString();
Source:  https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript