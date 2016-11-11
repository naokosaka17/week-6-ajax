$(document).ready(function(){
	//gifffer
	 window.onload = function() {
	        Gifffer();
	 }
	
	var queryURL;
	var topics = ["rainbow","red","orange","yellow","green","blue","purple",
				"pink","white","black","glitter","neon"];


	//button function for makes topics buttons
	function button(){
		for(i = 0; i < topics.length; i++){

			$("#buttons").append("<button class='color'>" + topics[i] + "</button>");
		}
	};


	//makes user keyword button
	function newkey(){
		$(".search").on("click",function(){
			newTopic = $('.input').val().trim();
			topics.push(newTopic);

			var newcolor = $("<button class='color'>"+ newTopic +"</button>");
			$("#buttons").append(newcolor);

		});
	
	};

	


	button();
	newkey();
	


	//show GIFs 
		//---probrem--- set same class but user input keys don't work
	$(".color").on("click",function(){ 
		//"this == '.color'"
		var p = $(this).text();


		queryURL = "https://api.giphy.com/v1/gifs/search?q=" + p + "&api_key=dc6zaTOxFJmzC";

		$.ajax({url: queryURL, method: 'GET'})
			.done(function(response){
				//check console, response.data == object.data from console
				var results = response.data;
				//show 10 gifs
				for(var i=0; i<10; i++){

					//each pair of gif and rate put in <div class= item>
					var gifDiv = $("<div class='item'>");
					//make variable for rating
					var rating = results[i].rating;
					//how to show rating
					var p = $("<p>").text("Rating: " + rating);
					var colorImage = $("<img>");
					//tried gifffer but doesn't work
						//var colorImage = $("<img data-gifffer>");

					//img source is "object.data[i].images.fixed-height.url". And attribute to "<img>"
					colorImage.attr("src",response.data[i].images.fixed_height.url);
					//append p and colorImage
					gifDiv.append(p);
					gifDiv.append(colorImage);
					//all infomations prepend to "#gifs"
					$("#gifs").prepend(gifDiv);
					


				}
			//check infomation from ajax
			console.log(response);

			});
	
		

	});


});
