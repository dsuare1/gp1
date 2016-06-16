///////////////////////////////////////////////////////////
// CLICK LISTENERS
///////////////////////////////////////////////////////////


///////// 'createGame.html' FORM /////////

$(".dropdown-menu li a").on("click", function() {
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('#dropdownMenu1').val($(this).data('value'));
    console.log($("#dropdownMenu1").val());

    if ($("#dropdownMenu1").val() == "3-on-3 Basketball" || $("#dropdownMenu1").val() == "5-on-5 Basketball") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#basketball-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
        $("#wind-warning").addClass("hidden");
        $("#temp-warning").removeClass("hidden");
    };

    if ($("#dropdownMenu1").val() == "7-on-7 Soccer" || $("#dropdownMenu1").val() == "11-on-11 Soccer") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#soccer-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
        $("#wind-warning").addClass("hidden");
        $("#wind-warning").addClass("hidden");
    };

    if ($("#dropdownMenu1").val() == "Disc Golf (North Austin)" || $("#dropdownMenu1").val() == "Disc Golf (South Austin)") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#disc-golf-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
        $("#temp-warning").addClass("hidden");
        $("#wind-warning").removeClass("hidden");
    };

    // pulsating text effect
    $(function() {
        var p = $(".pulsate-text");
        for (var i = 0; i < 3; i++) {
            p.animate({ opacity: 0.2 }, 1000, 'linear').animate({ opacity: 1 }, 1000, 'linear');
        }

    });
});

////////////////////////////////////
// VALIDATION FUNCTIONS
////////////////////////////////////
function checkUserName(pickupUserName) {
    // regular expression to match required user name format
    re = /[a-z]\w+/gi;

    if (pickupUserName !== '' && !pickupUserName.match(re)) {
        vex.dialog.alert("Please enter a valid user name");
        return false;
    }
    return true;
};

function checkGameName(pickupGameName) {
    // regular expression to match required game name format
    re = /[a-z]\w+/gi;

    if (pickupGameName !== '' && !pickupGameName.match(re)) {
        vex.dialog.alert("Please enter a valid game name");
        return false;
    }
    return true;
};

function checkLocation(pickupLocation) {

    if (pickupLocation === '') {
        vex.dialog.alert("Please enter a valid location (either the place name or the full address)");
        return false;
    }
    return true;
};

function checkDate(pickupDate) {
    // regular expression to match required date format
    re = /^([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?$/;

    if (pickupDate !== '' && !pickupDate.match(re)) {
        vex.dialog.alert("Please enter a valid date");
        return false;
    }
    return true;
};

function checkTime(pickupTime) {
    // regular expression to match required date format
    re = /^([0-1]?[0-9]|2[0-3])(:[0-5][0-9])?$/;

    if (pickupTime !== '' && !pickupTime.match(re)) {
        vex.dialog.alert("Please enter a valid time")
    }
    return true;
}

///////// 'findGame.html' CHILDREN ADDED FROM FIREBASE /////////

$("#individual-game-holder").on("click", function() {
    var location = $("#game-location").text();

    console.log(location);

    location = encodeURIComponent(location.trim());

    console.log(location);

    $(".find-game-map").removeClass("visible").addClass("hidden");

    $("#map-holder").html("<iframe class='visible' width='100%' height='440' frameborder='0' src='https://www.google.com/maps/embed/v1/search?q=" + location + "&amp;center=30.2672%2C-97.7431&amp;zoom=10&amp;key=AIzaSyDchdsjpvalXui_QTAFtm9Hb1Ka67X5s1k'></iframe>");
});


///////////////////////////////////////////////////////////
// AJAX CALLS
///////////////////////////////////////////////////////////


///////// WEATHER UNDERGROUND /////////

// This is our API Key - https://home.openweathermap.org/api_keys
var APIKey = "d4bcc2842a7e6378";

var queryURL = "http://api.wunderground.com/api/" + APIKey + "/geolookup/conditions/q/TX/Austin.json";

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({ url: queryURL, method: 'GET' }).done(function(response) {

    // Log the resulting object
    // console.log(response);

    if (response.current_observation.feelslike_f > 85) {
        $("#temp-warning").html("Looks like it's pretty hot outside.  You may want to consider looking for places to play inside.");
    } else {
        $("#temp-warning").html("Looks like the weather is pretty nice outside!  Consider looking for an outside area to play!");
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

// Scroll the weather warning across the 'weather-scroll-div'
// var marquee = $("#weather-scroll-div");
// marquee.each(function() {
//     var mar = $(this),indent = mar.width();
//     mar.marquee = function() {
//         indent--;
//         mar.css("text-indent",indent);
//         if (indent < -1 * mar.children("#weather-scroll-div").width()) {
//             indent = mar.width();
//         }
//     };
//     mar.data('interval',setInterval(mar.marquee,1000/80));
// });


///////////////////////////////////////////////////////////
// FIREBASE
///////////////////////////////////////////////////////////

// Create a Pickup Game
// In Firebase 
//  -Set Location
//  -Set Sport
//  -Set Members
//  -set Date/Time
//  ?-set Frequency daily, weekly, monthly

// 1. Link to Firebase
var pickupData = new Firebase("https://pkupgames.firebaseio.com/");

// 2. Button for adding pickupGame
$("#addPickupGame").on("click", function(e) {

    if (($("#user-name-input").val() == "") || ($("#game-name-input").val() == "") || ($("#location-input").val() == "") || ($("#date-input").val()) == "" || ($("#time-input").val() == "" )) {
            vex.dialog.alert("Please enter the necessary information into the form");
            return false;
        };

    // prevents reloading of page
    e.preventDefault();

    // Grabs user input
    var pickupGameType = $("#dropdownMenu1").val().trim();
    console.log(pickupGameType);
    var pickupUserName = $("#user-name-input").val().trim();
    var pickupGameName = $("#game-name-input").val().trim();
    var pickupLocation = $("#location-input").val().trim();
    var pickupDate = $("#date-input").val().trim();
    var pickupTime = $("#time-input").val().trim();

    // Creates local "temporary" object for holding pickup data

    if (checkUserName(pickupUserName) && checkGameName(pickupGameName) && checkLocation(pickupLocation) && checkDate(pickupDate) && checkTime(pickupTime)) {
        var newPickup = {
            type: pickupGameType,
            userName: pickupUserName,
            gameName: pickupGameName,
            location: pickupLocation,
            date: pickupDate,
            time: pickupTime
        }

    // Uploads pickup data to the database
    pickupData.push(newPickup);
}

    // Logs everything to console
    console.log(newPickup.type);
    console.log(newPickup.userName);
    console.log(newPickup.gameName);
    console.log(newPickup.location);
    console.log(newPickup.date);
    console.log(newPickup.time);

    // Clears all of the text-boxes
    $("#dropdownMenu1").val("Sport & Game Type" + "<span class='caret'></span>");
    $("#user-name-input").val("");
    $("#game-name-input").val("");
    $("#location-input").val("");
    $("#date-input").val("");
    $("#time-input").val("");

});


pickupData.on("child_added", function(childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    // Grabs user input
    var pickupGameType = $("#dropdownMenu1").val().trim();
    var pickupUserName = $("#user-name-input").val().trim();
    var pickupGameName = $("#game-name-input").val().trim();
    var pickupLocation = $("#location-input").val().trim();
    var pickupDate = $("#date-input").val().trim();
    var pickupTime = $("#time-input").val().trim();

    $(".active-games").append("<h4>Game type:</h4><p id='game-type'>" + pickupGameType + "</p><br><h4>Created by:</h4><p id='created-by'>" + pickupUserName + "</p><br><h4>Game name:</h4><p id='game-name'>" + pickupGameName + "</p><br><h4>Location:</h4><p id='game-location'>" + pickupLocation + "</p><br><h4>Date:</h4><p id='game-date'>" + pickupDate + "</p><br><h4>Time</h4><p id='game-time'>" + pickupTime + "</p>");

    // // Prettify the pickup Time
    // var pickupTimePretty = moment.unix(pickupTime).format("MM/DD/YY");
    // // Calculate the months worked using hardconre math
    // // To calculate the months worked
    // var pickupMonths = moment().diff(moment.unix(pickupTime, 'X'), "months");
    // console.log(pickupMonths);

    // // Calculate the total billed freq
    // var pickupBilled = pickupMonths * pickupFreq;
    // console.log(pickupBilled);

    // Calculate the time when Next pickup Arrives
    // var pickupNextArr;

    // Calculate the time remaining until Next pickup Arrives
    // var pickupMinsAway;

    // Add each pickup's data into the table
    //$("#pickupTable > tbody").append("<tr><td>" + pickupTitle + "</td><td>" + pickupLoc + "</td><td>" + pickupTimePretty + "</td><td>" + pickupMonths + "</td><td>" + pickupFreq + "</td><td>");
    // $("#pickupTable > tbody").append("<tr><td>" + pickupTitle + "</td><td>" + pickupLoc + "</td><td>" + pickupFreq + "</td><td>" + pickupNextArr + "</td><td>" + pickupMinsAway + "</td><td>");

});
