$(document).ready(function () {

    var newAnimals = ["dog", "cat"];

    function displayInfo() {
        $("button").on("click", function () {
            var animal = $(this).attr("data-animal");

            var gihpyApiUrl = "http://api.giphy.com/v1/gifs/search?q=" + animal +
                "&api_key=T16BixY68ApEFJwpLt9pj0ic2xZAnGm3&limit=20";  

            $.ajax({
                url: gihpyApiUrl,
                method: 'GET'
            }).then(function (response) {
                var data = response.data;

                for (var i = 0; i < data.length; i++) {

                    var animalDiv = $("<div class='animal'>");

                    var rating = data[i].rating;
                    var temp = $("<p>").text("Rating: " + data[i].rating);
                    animalDiv.append(temp);

                    var image = $("<img>").attr("src", data[i].images.fixed_height.url);

                    image.addClass("gif");
                    image.attr("src", data[i].images.fixed_height.url);
                    image.attr("data-still",  data[i].images.fixed_height_still.url);
                    image.attr("data-animate", data[i].images.fixed_height.url);
                    image.attr("data-state", "still");

                    animalDiv.append(image);
                    $(".animalOptions").prepend(animalDiv);

                    $(".gif").on("click", function() {
                        var state = $(this).attr("data-state");

                        if (state === "still") {
                            $(this).attr("src", $(this).attr("data-animate"));
                            $(this).attr("data-state", "animate");
                        } else {
                            $(this).attr("src", $(this).attr("data-still"));
                            $(this).attr("data-state", "still");
                    };

                });
            }

            });

        });

    };

    function renderButtons() {
        $(".animalButtons").empty();

        for (var i = 0; i < newAnimals.length; i++) {
            var newBtn = $("<button>");
            newBtn.addClass("animal5");
            newBtn.attr("data-animal", newAnimals[i]);
            newBtn.text(newAnimals[i]);
            $(".animalButtons").append(newBtn);
        }
    }


    $("#add-animal").on("click", function (event) {
        event.preventDefault();

        var animal1 = $("#animal-input").val().trim();
        newAnimals.push(animal1);

        renderButtons();
    });

    $(document).on("click", ".animal5", displayInfo);

    renderButtons();

});















