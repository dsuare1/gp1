var weatherResponse;

$(".sport-search").on("click", function(weatherResponse) {

    locSearch = $(this).attr("id");

    if ($(this).attr("id") == "basketball") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#basketball-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
        $("#wind-warning").addClass("hidden");
        $("#temp-warning").removeClass("hidden");
    };

    if ($(this).attr("id") == "soccer") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#soccer-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
        $("#wind-warning").addClass("hidden");
        $("#wind-warning").addClass("hidden");
    };

    if ($(this).attr("id") == "disc-golf") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#disc-golf-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
        $("#temp-warning").addClass("hidden");
        $("#wind-warning").removeClass("hidden");
    };

});

// This is our API Key - https://home.openweathermap.org/api_keys
var APIKey = "d4bcc2842a7e6378";

var queryURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/conditions/q/TX/Austin.json";

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({ url: queryURL, method: 'GET' }).done(function(response) {

    // Log the resulting object
    console.log(response);

    if (response.current_observation.feelslike_f > 85) {
        $("#temp-warning").html("Looks like it's pretty hot outside.  You may want to consider looking for places to play basketball inside.");
    } else {
        $("#temp-warning").html("Looks like the weather is pretty nice outside!  Consider looking for an outside court to play!");
    };

    if (response.current_observation.wind_gust_mph > 25) {
        $("#wind-warning").html("Looks like it's pretty windy out there.  Be sure to throw your disc straight and true!")
    } else {
        $("#wind-warning").html("The wind isn't gusting very much and shouldn't mess with your game today!  Have fun!");
    };

    $("#weather").html(response.current_observation.weather);
    $("#temp").html(response.current_observation.temp_f);
    $("#feels-like").html(response.current_observation.feelslike_f);
    $("#heat-index").html(response.current_observation.heat_index_f);
    $("#forecast-url").html(response.current_observation.forecast_url);

});
