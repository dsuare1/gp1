// This is our API Key - https://home.openweathermap.org/api_keys
    var APIKey = "d4bcc2842a7e6378";

    var queryURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/conditions/q/TX/Austin.json";

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

      // Log the resulting object
      console.log(response);

      $("#weather").html(response.current_observation.weather);
      $("#temp").html(response.current_observation.temp_f);
      $("#feels-like").html(response.current_observation.feelslike_f);
      $("#heat-index").html(response.current_observation.heat_index_f);
      $("#forecast-url").html(response.current_observation.forecast_url);

    });