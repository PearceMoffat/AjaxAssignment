var APIKey = "7e026d3664054556a03c7d48eeaa2cda"
var queryURL;
var newSrc;
var limit = 12;
var topics = ["voltorb", "diglett", "gallade", "vulpix", "hitmonchan", "pidgey",
				  "totodile", "skarmory", "kadabra", "chansey", "dunsparce", "butterfree",
				  "tropius", "starmie", "jirachi", "dedenne", "flabebe"];

// Create buttons at the top of the page, one for each item in "topics" array
function updateButtons() {
	$("#buttons").empty();
	for (var i=0; i<topics.length; i++) {
		$("#buttons").append("<button class='button' value='" + topics[i] + "'>" +
			topics[i] + "</button>");
	}
}

updateButtons();

// When the submit button is clicked to add a new item
$("#submit").on("click", function(event) {
	
	event.preventDefault();

	if ($("#search")[0].value != "") { // Prevent user from submitting empty box
		var newPokemon = $("#search").val().trim();
		topics.push(newPokemon); // Add new search term to topics list
		updateButtons();
		$("#search")[0].value = ""; // Clear input field
	}
});

// Whenever a button is clicked
$("body").on("click", ".button", function() {
	if ($("#quantity")[0].value > 20) { // Make sure quantity doesn't exceed 20
		$("#quantity")[0].value = 20;
	}
	if ($("#quantity")[0].value < 1) { // Make sure quantity is at least 1
		$("#quantity")[0].value = 1;
	}
	limit = $("#quantity")[0].value;
	var pokeName = this.value
	
	$("#images").empty();
	queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + APIKey +
	"&q=" + pokeName + "&limit=" + limit + "&offset=0&rating=PG&lang=en";
	
	$.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
    	for (var i=0; i<response.data.length; i++) {
    		$("#images").append("<div class='imagecontainer'><img class='picture' src='" + 
    			response.data[i].images.fixed_width_still.url +
    			"' moving='0'>Rating: " + response.data[i].rating + "</div>");
    	}
    });
});

// Whenever a picture is clicked
$("body").on("click", ".picture", function() {
	
	var src = $(this).attr('src');

	// If the picture is still, make it move
	if (this.moving == 0) {
		$(this).attr('src', src.replace('w_s.gif', 'w.gif'));

		this.moving = 1;
	}
	// If the picture is moving, make it still
	else {
		$(this).attr('src', src.replace('w.gif', 'w_s.gif'));

		this.moving = 0;
	}
});