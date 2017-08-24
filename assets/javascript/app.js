var APIKey = "7e026d3664054556a03c7d48eeaa2cda"
var queryURL;
var newSrc;
var limit = 12;
var topics = ["voltorb", "diglett", "gallade", "vulpix", "hitmonchan", "pidgey",
				  "totodile", "skarmory", "kadabra", "chansey", "dunsparce", "butterfree",
				  "tropius", "starmie", "jirachi", "dedenne", "flabebe"];

function updateButtons() {
	$("#buttons").empty();
	for (var i=0; i<topics.length; i++) {
		$("#buttons").append("<button class='button' value='" + topics[i] + "'>" +
			topics[i] + "</button>");
	}
}

updateButtons();


$("#submit").on("click", function(event) {
	
	event.preventDefault();

	if ($("#search")[0].value != "") {
		var newPokemon = $("#search").val().trim();
		topics.push(newPokemon);
		updateButtons();
		$("#search")[0].value = "";
	}
});

$("body").on("click", ".button", function() {
	if ($("#quantity")[0].value > 20) {
		$("#quantity")[0].value = 20;
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
    			"' name='0'>Rating: " + response.data[i].rating + "</div>");
    	}
    });
});

$("body").on("click", ".picture", function() {
	
	var src = $(this).attr('src');

	if (this.name == 0) {
		$(this).attr('src', src.replace('w_s.gif', 'w.gif'));

		this.name = 1;
	}
	else {
		$(this).attr('src', src.replace('w.gif', 'w_s.gif'));

		this.name = 0;
	}
});