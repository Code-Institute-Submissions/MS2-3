// Remove landing screen to show main game area when "Start Game" button is clicked 

$("#start-game").click(function () {
    $("#landing").removeClass("d-flex");
    $("#landing").addClass("d-none");
    // Display spinning vinyl and needle arm animation 
    $("#spinningVinyl").removeClass("d-none");
    $("#spinningVinyl").addClass("d-flex");
});

// Return to home screen when drum console home icon is clicked 

$(".home-btn").click(function () {
    window.location.reload()
});