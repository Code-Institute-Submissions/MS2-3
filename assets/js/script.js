// Remove landing screen to show main game area when "Start Game" button is clicked 
$("#start-game").click(function () {
    $("#landing").removeClass("d-flex");
    $("#landing").addClass("d-none");
});