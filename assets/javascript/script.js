//VARIABLES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//variable for initial animal array
var animals = ["cat",
    "dog",
    "parrot",
    "pig",
    "cow",
    "ferret",
    "moose",
    "bear",
    "lion",
    "deer",
    "starfish",
    "squirrel",
    "beaver"]


    var searchAnimal;





//FUNCTIONS
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//button builder creates the buttons for the top of the page
function buttonBuilder() {


    //first clears existing buttons
    $("#button-holder").html("");

    //runs through and creates a button for each animal
    for (i = 0; i < animals.length; i++) {
        
        //adding button and relevant classes
        var newButton = $("<button>");

        newButton.addClass("btn");

        newButton.addClass("btn-info");

        newButton.addClass("mr-3");

        newButton.addClass("btn-sm");

        newButton.addClass("mt-3");

        newButton.addClass("animal-button");

        newButton.attr("data-animal", animals[i]);

        newButton.append(animals[i]);

        $("#button-holder").append(newButton);
        

    }

}


//the function that runs when the submit button is clicked
function submitButton() {

    var submitAnimal = $("#user-input").val().trim();

    $("#user-input").val("");

    animals.push(submitAnimal);

    buttonBuilder();

}


function animalSearch() {

    //clears the initial html for clean slate search
    $("#gif-holder").html("")

    //sets up to be searched by user input
    var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=105wPhealYmRDYnWLl8QYzUfb7La6mLw&limit=10&q=" + searchAnimal;
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        //for each of the items returned (10), bootstrap card is made and posted on the page
        for (i = 0; i < response.data.length; i++) {

            //storing url of still image gif
            var fixedgifURL = response.data[i].images.fixed_width_still.url;

            var animgifURL = response.data[i].images.fixed_width.url;

            var gifRating = response.data[i].rating;

            var newCard = $("<div>");

            newCard.addClass("card");

            newCard.addClass("animal-card");

            newCard.addClass("mr-3");

            newCard.addClass("mt-3");

            $("#gif-holder").append(newCard);

            var image = $("<img>");

            image.addClass("card-img-top");

            image.addClass("animal-image");

            image.attr("src", fixedgifURL)

            image.attr("data-stillurl", fixedgifURL);

            image.attr("data-animurl", animgifURL);

            image.attr("data-ismoving", 0);

            $(newCard).append(image);

            var ratingText = $("<p>");

            ratingText.addClass("card-text");

            ratingText.addClass("text-center")

            $(ratingText).text("Rating: " + gifRating)

            $(newCard).append(ratingText);
        }


      });
}


//api key  http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=105wPhealYmRDYnWLl8QYzUfb7La6mLw&limit=5




//SCRIPT
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function () {

    buttonBuilder();

    //fires when submit is clicked
    $("#submit").on("click", function (event) {

        event.preventDefault();

        submitButton();

    })

    //triggers click event if user hits enter
    $('#user-input').keydown(function(event){ 

        var keyCode = (event.keyCode ? event.keyCode : event.which);  

        if (keyCode == 13) {

            $('#submit').trigger('click');

        }
    });

    //triggers when a button is clicked, loaded through DOM so continues to work after dynamically added elements
    $(document).on("click", ".animal-button", function() {

        searchAnimal = $(this).attr("data-animal");

        animalSearch();
    })

    //triggers when an image is clicked on (to animate)
    $(document).on("click", "img", function() {
        console.log("got here");

        var movingCheck = $(this).attr("data-ismoving");

        movingCheck = parseInt(movingCheck);

        if (movingCheck === 0) {

            console.log("animating");

            var animsrc = $(this).attr("data-animurl");

            $(this).attr("data-ismoving", 1);

            $(this).attr("src", animsrc);

        } else {

            var stillsrc = $(this).attr("data-stillurl");

            $(this).attr("data-ismoving", 0);

            $(this).attr("src", stillsrc);

        }

    });

});

