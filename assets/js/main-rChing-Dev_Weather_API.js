// This is our API Key - https://home.openweathermap.org/api_keys
    var APIKey = "d4bcc2842a7e6378";

    var city = ""
    var state= ""

    // Here we are building the URL we need to query the database
    // var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=Bujumbura&units=imperial&appid=" + APIKey;
    // http://api.wunderground.com/api/d4bcc2842a7e6378/forecast/geolookup/conditions/q/CA/San_Francisco.json
    var queryURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/q/TX/Austin.json";
    // var queryURL = "api.wunderground.com/api/" + APIKey + "/geolookup/q/" + state + "/" + city + ".json";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({url: queryURL, method: 'GET'})

    // We store all of the retrieved data inside of an object called "response"
    .done(function(response) {

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      $('.city').html("<h1>Bujumbura Weather Details</h1>");
      $(".wind").html("Wind Speed: " + response.wind.speed);
      $(".humidity").html("Humidity: " + response.main.humidity);
      $(".temp").html("Temperature (F) " + response.main.temp);

      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    }); 