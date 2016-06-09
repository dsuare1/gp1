var clickCounter = 0;

// Create a Pickup Game
// In Firebase 
//	-Set Location
//	-Set Sport
//	-Set Members
// 	-set Date/Time
//	?-set Frequency daily, weekly, monthly
//	


// Steps to complete:
/*
1. Create Firebase link
2. Create button for adding new pickups - then update the html + update the database
3. Create a way to retrieve pickups from the pickup database.
4. Create a way to calculate the months worked. Using difference between start and current time. Then use moment.js formatting to set difference in months.
5. Calculate Total billed

*/
// 1. Link to Firebase
var pickupData = new Firebase("https://pkupgames.firebaseio.com/");

// 2. Button for adding pickupGame
$("#addPickupGame").on("click", function(){

	// Grabs user input
	var pickupTitle = $("#pickupTitleInput").val().trim();
	var pickupSport = $("#pickupSportInput").val().trim();
	//var pickupLoc = $("#LocInput").val().trim();
	var pickupFacility = $("#pickupFacilityInput").val().trim();
	var pickupCity = $("#pickupCityInput").val().trim();
	var pickupState = $("#pickupStateInput").val().trim();
	var pickupZip = $("#pickupZipInput").val().trim();
	var pickupDate = moment($("#pickupDateInput").val().trim(), "DD/MM/YY").format("X");
	var pickupTime = moment($("#pickupTimeInput").val().trim(), "DD/MM/YY").format("X");
	//var pickupFreq = $("#freqInput").val().trim();
	
	// Creates local "temporary" object for holding pickup data
	var newPickup = {
		title:  pickupTitle,
		sport: pickupSport,
		facility: pickupFacility,
		//loc: pickupLoc,
		city: pickupCity,
		state: pickupState,
		zip: pickupZip,
		date: pickupDate,
		time: pickupTime,
		//freq: pickupFreq
	}

	// Uploads pickup data to the database
	pickupData.push(newPickup);

	// Logs everything to console
	console.log(newpickup.Title);
	console.log(newpickup.Loc);
	console.log(newpickup.Time);
	console.log(newpickup.freq)

	// Alert
	//alert("pickup successfully added");

	// Clears all of the text-boxes
	$("#pickupTitleInput").val("");
	$("#pickupSportInput").val("");
	//$("#LocInput").val("");
	$("#pickupFacilityInput").val("");
	$("#pickupCityInput").val("");
	$("#pickupStateInput").val("");
	$("#pickupZipInput").val("");
	$("#pickupDateInput").val("");
	$("#pickupTimeInput").val("");

	// Prevents moving to new page
	return false;
});


// 3. Create Firebase event for adding pickup to the database and a row in the html when a user adds an entry
pickupData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var pickupTitle = childSnapshot.val().;
	var pickupSport = childSnapshot.val().sport;
	//var pickupLoc = $("#LocInput").val().trim();
	var pickupFacility = childSnapshot.val().facility;
	var pickupCity = childSnapshot.val().city;;
	var pickupState = childSnapshot.val().state;
	var pickupZip = childSnapshot.val().zip;
	var pickupDate = childSnapshot.val().date;
	var pickupTime = childSnapshot.val().time;
	//var pickupFreq = $("#freqInput").val().trim();

	// pickup Info
	console.log(pickupTitle);
	console.log(pickupLoc);
	console.log(pickupTime);
	console.log(pickupFreq);

	// Prettify the pickup Time
	var pickupTimePretty = moment.unix(pickupTime).format("MM/DD/YY");
	// Calculate the months worked using hardconre math
	// To calculate the months worked
	var pickupMonths = moment().diff(moment.unix(pickupTime, 'X'), "months");
	console.log(pickupMonths);

	// Calculate the total billed freq
	var pickupBilled = pickupMonths * pickupFreq;
	console.log(pickupBilled);

	// Calculate the time when Next pickup Arrives
	var pickupNextArr

	// Calculate the time remaining until Next pickup Arrives
	var pickupMinsAway

	// Add each pickup's data into the table
	//$("#pickupTable > tbody").append("<tr><td>" + pickupTitle + "</td><td>" + pickupLoc + "</td><td>" + pickupTimePretty + "</td><td>" + pickupMonths + "</td><td>" + pickupFreq + "</td><td>");
	$("#pickupTable > tbody").append("<tr><td>" + pickupTitle + "</td><td>" + pickupLoc + "</td><td>" + pickupFreq + "</td><td>" + pickupNextArr + "</td><td>" + pickupMinsAway + "</td><td>");

});


// Find a Pickup Game

