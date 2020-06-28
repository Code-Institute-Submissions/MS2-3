// Global Variables
let retry = 0;
let shots;
let kickCounter = 0;
let snareCounter = 0;
let hiHatsCounter = 0;
let openHCounter = 0;
let setTempo = 0;
let level = 1;

// Function to decrease score by one and update shot counter text
function minusShots() {
    shots--;
    $(".digits").text(shots);
    sound.play("error");
}

// Increments counter variables by 1 if the corresponding pad is clicked
function padActiveCalculator() {
    if ($("#kick").hasClass("trigger") && $(".kick-drum").hasClass("correct")) {
        kickCounter++;
    }
    if ($("#snare").hasClass("trigger") && $(".snare-drum").hasClass("correct")) {
        snareCounter++;
    }
    if ($("#hi-hats").hasClass("trigger") && $(".snare-drum").hasClass("correct")) {
        hiHatsCounter++;
    }
    if ($("#open-hh").hasClass("trigger") && $(".snare-drum").hasClass("correct")) {
        openHCounter++;
    }
}

/*
* Function to check to see if the correct clicks match the sum of the corresponding drum array
* If the correct clicks match the sum of the array the current 16 pads are hidden and next drum typ pads are displayed
* If all drum types have all the correct pads selected the sequencer resets, pad counters are cleared,
* a new set of patterns are loaded, the level increase and the next level modal is displayed.
*/
function advancePads() {
    if (kickCounter === sumOfKickArray) {
        $(".kick-pads, .hihat-pads, .openhh-pads").hide();
        $(".snare-pads").show();
        $("#snare").addClass("trigger");
        $("#hi-hats, #open-hh").removeClass("trigger");
        sound.play("yeah");
    }
    if ($("#snare").hasClass("trigger") && $(".snare-drum").hasClass("correct")) {
        if (snareCounter === sumOfSnareArray) {
            $(".snare-pads, .kick-pads, .openhh-pads").hide();
            $(".hihat-pads").show("show");
            $("#hi-hats").addClass("trigger");
            $("#open-hh").removeClass("trigger");
            sound.play("yeah");
        }
    }
    if ($("#hi-hats").hasClass("trigger") && $(".snare-drum").hasClass("correct")) {
        if (hiHatsCounter === sumOfHihatArray) {
            $(".snare-pads, .hihat-pads, .kick-pads").hide();
            $(".openhh-pads").show("show");
            $("#open-hh").addClass("trigger");
            sound.play("yeah");
        }
    }
    if ($("#open-hh").hasClass("trigger") && $(".snare-drum").hasClass("correct")) {
        if (openHCounter === sumOfOpenHHArray) {
            $(".correct, .wrong").removeClass("pointer-none");
            drumKit.updateBtn();
            drumKit.start();
            clearPads();
            resetConsole();
            getData(setPatterns);
            clearCounter();
            levelUp();
            youWin();
            levelDisplayModal();
        }
    }
}

// Function to increase level by one and update level text 
function levelUp() {
    level++;
    $(".level-up").text(level);
}

// Function to clear incremental drum counters
function clearCounter() {
    kickCounter = 0;
    snareCounter = 0;
    hiHatsCounter = 0;
    openHCounter = 0;
}

// Function to display win modal if level three is passed
function youWin() {
    if (level === 4) {
        $("#playAgainModal").modal("show");
        sound.play("crowd");
    }
    if (level === 3) {
        sound.play("finalRound");
    }
}

// Function to open try again modal and play sound
function youLose() {
    if (shots == 0) {
        $("#tryAgainModal").modal("show");
        sound.play('backSpin');
        // Set Howler global volume to 50%
        Howler.volume(0.5);
    }
}

/*
* Function to reset the drum console:
* Drum pads colour style is removed and kick drum pads are activated
*/
function resetConsole() {
    // Clears all pads when reset
    $(".kick-drum, .snare-drum, .hihat-drum, .openhh-drum").removeClass("correct wrong");
    // Revert back to kick instrument pads
    $(".snare-pads, .hihat-pads, .openhh-pads").hide();
    $(".kick-pads").show();
    $("#kick").addClass("trigger");
    $("#hi-hats, #snare, #open-hh").removeClass("trigger");
    // Reset Howler global volume to 100%
    Howler.volume(1);
}

// Function to clear pads of setPatterns
function clearPads() {
    for (let i = 0; i < 16; i++) {
        $(`.kick-drum.pad-${i}, .snare-drum.pad-${i}, .hihat-drum.pad-${i}, .openhh-drum.pad-${i}`).removeClass("playing");
    }
}

// Function to show next level modal
function levelDisplayModal() {
    if (level < 4) {
        $("#level-number").modal("show");
        setTimeout(function () {
            $("#level-number").modal("hide");
        }, 3000);
        $(".level-up-modal-number").text(level);
    }
    setTimeout(function () {
        sound.play("titleFade");
    }, 100);
    sound.play("start");
    setTimeout(function () {
        sound.play("backSpin");
    }, 2000);
}

// Function to exit to landing screen
function exitGame() {
    sound.play("exit");
    // Sets timeout so exit sound plays in full before reload
    //ensures that the function will always be called in the context of window.location
    //SRC: https://stackoverflow.com/questions/39407803/why-does-settimeoutlocation-reload-throw-a-typeerror/39407908
    window.setTimeout(window.location.reload.bind(window.location), 500);
}

// Function to reset game from win/lose modals
function resetGame(){
    shots = retry;
    $(".digits").text(shots);
    $(".correct, .wrong").removeClass("pointer-none");
    clearPads();
    clearCounter();
    resetConsole();
    getData(setPatterns);
    sound.play('start');
    level = 1;
    $(".level-up").text(level);
}

$(".play-again, .try-again").click(function(){
    resetGame();
});

// Remove landing screen to show main game area when "Start Game" button is clicked 
$("#start-game-easy, #start-game-normal, #start-game-hard").click(function () {
    $("#landing").removeClass("d-flex");
    $("#landing").addClass("d-none");
    // Display spinning vinyl and needle arm animation 
    $("#spinningVinyl").removeClass("d-none");
    $("#spinningVinyl").addClass("d-flex");
    // Display main game console 
    $("main").removeClass("d-none");
    $("main").addClass("d-flex");
    // Remove parallax dust particles 
    $(".parallax").removeClass("d-sm-flex");
});

// Set shots counter for each difficulty
$("#start-game-easy").click(function () {
    retry = 20;
    shots = 20;
    setTempo = 160;
    $(".digits").text(20);
    sound.play('start');
    // Sets the pad pattern
        getData(setPatterns);
});

$("#start-game-normal").click(function () {
    retry = 10;
    shots = 10;
    setTempo = 100;
    $(".digits").text(10);
    sound.play('start');
    // Sets the pad pattern
    getData(setPatterns);
});

$("#start-game-hard").click(function () {
    retry = 5;
    shots = 5;
    setTempo = 80;
    $(".digits").text(5);
    sound.play('start');
    // Sets the pad pattern
    getData(setPatterns);
});

// Flip records when hovering difficulty select buttons 
$("#start-game-easy").hover(
    function () {
        $("#bronze").addClass("flip");
    },
    function () {
        $("#bronze").removeClass("flip");
    }
);

$("#start-game-easy").hover(
    function () {
        $("#bronze").addClass("flip");
    },
    function () {
        $("#bronze").removeClass("flip");
    }
);

$("#start-game-normal").hover(
    function () {
        $("#silver").addClass("flip");
    },
    function () {
        $("#silver").removeClass("flip");
    }
);

$("#start-game-hard").hover(
    function () {
        $("#gold").addClass("flip");
    },
    function () {
        $("#gold").removeClass("flip");
    }
);

//Show kick pads only on load
$(".snare-pads, .hihat-pads, .openhh-pads").hide();

// Return to home screen when drum console home icon is clicked 
$(".home-btn, .exit-game").click(function () {
    sound.play("exit");
    exitGame();
});

$(".how-to-btn").click(function(){
    $("#howToPlayModal").modal("show");
    sound.play("start");
});