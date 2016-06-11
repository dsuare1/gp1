var locSearch = "";

$(".sport-search").on("click", function() {
  
  // prevent reload of page when user presses 'Enter'
  // e.preventDefault();
  
  // sets the 'locSearch' variable to be the value of the search input
  locSearch = $(this).attr("id");
  console.log(locSearch);
  
  // clears the value of the input field for the user's next search
  // $("#location-search-input").val("");

  // 
  $("#map-holder").html("<iframe width='600' height='450' frameborder='0' style='border:0' src='https://www.google.com/maps/embed/v1/search?q=" + locSearch + "&key=AIzaSyBYNfzV85uLn4SDjRB65-rp1nTAtWwc-Jo'></iframe>");

});

// function searchLocations() {
//     $.ajax({ url: queryURL, method: 'GET' }).done(function(response) {
//         for (var i = 0; i < response.data.length; i++) {
//             $(".gifs-display").append("<div class='img-div text-center'><img src='" + response.data[i].images.fixed_height_still.url + "'class='returnedGif' alt='Rocker Gif' data-still=" + response.data[i].images.fixed_height_still.url + " data-animate=" + response.data[i].images.fixed_height.url + "><p>Rating: " + response.data[i].rating + "</p></div>");
//             $(".returnedGif").attr("data-state", "still");
//         }
//         console.log(response);
//     });
// }

// $(".buttons").on("click", ".rocker", function() {
//     rocker = $(this).attr("data-name");
//     queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rocker + "&limit=10&api_key=dc6zaTOxFJmzC";
//     $(".gifs-display").empty();
//     getGifs();
// });

// ///////////////////////////////////////////////
// // GLOBAL VARIABLE
// ///////////////////////////////////////////////
// var searchQuery = "gym";

// ///////////////////////////////////////////////
// // BUTTON SELECTION LISTENER
// ///////////////////////////////////////////////

// $(".btn").on("click", function() {
//   if ($(this).attr("id") === "basketball") {
//     searchQuery = "basketball";
//     console.log(searchQuery);
//     callback();
//     createMarker();
//   }

//   $(".btn").on("click", function() {
//   if ($(this).attr("id") === "soccer") {
//     searchQuery = "soccer fields";
//     console.log(searchQuery);
//     callback();
//     createMarker();
//   }

//   $(".btn").on("click", function() {
//   if ($(this).attr("id") === "basketball") {
//     searchQuery = "basketball";
//     console.log(searchQuery);
//     callback();
//     createMarker();
//   }

//   if ($(this).attr("id") === "parks") {
//     searchQuery = "parks";
//     console.log(searchQuery);
//     callback();
//     createMarker();
//   }
// });

// ///////////////////////////////////////////////
// // GLOBAL GOOGLE MAPS API
// ///////////////////////////////////////////////

// var map;
// var infowindow;
// var MyLocation = {lat: 30.27830, lng: -97.72978};

// function initMap() {

//   map = new google.maps.Map(document.getElementById('map'), {
//     center: MyLocation,
//     zoom: 13
//   });

//   infowindow = new google.maps.InfoWindow();
//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch({
//     location: MyLocation,
//     radius: 5000,
//     type: [searchQuery]
//   }, callback);
// }

// function callback(results, status) {
//   if (status === google.maps.places.PlacesServiceStatus.OK) {
//     for (var i = 0; i < results.length; i++) {
//       createMarker(results[i]);
//     }
//   }
// }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location
//   });

//   google.maps.event.addListener(marker, 'click', function() {
//     infowindow.setContent(place.name);
//     infowindow.open(map, this);
//   });
// }