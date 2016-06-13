var locSearch = "";

$(".sport-search").on("click", function() {

    locSearch = $(this).attr("id");

    console.log(locSearch);

    if ($(this).attr("id") == "basketball") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#indoor-basketball-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
    };

    if ($(this).attr("id") == "soccer") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#soccer-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
    };

    if ($(this).attr("id") == "disc-golf") {
        $(".visible").removeClass("visible").addClass("hidden");
        $("#disc-golf-map")
            .removeClass("hidden")
            .addClass("visible")
            .fadeIn(500);
    };

});
