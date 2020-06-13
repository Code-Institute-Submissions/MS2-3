// Global Variables
let retry = 0;
let kickArray = [];
let snareArray = [];
let hihatArray = [];
let openhhArray = [];
let shots;



/*--------------------------------- Landing Screen ------------------------------*/

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
    shots = 20;
    retry = 20;
    $(".digits").text(20);
    sound.play('start');
});

$("#start-game-normal").click(function () {
    shots = 10;
    retry = 10;
    $(".digits").text(10);
    sound.play('start');
});

$("#start-game-hard").click(function () {
    shots = 5;
    retry = 5;
    $(".digits").text(5);
    sound.play('start');
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

// Flip records when hovering difficulty select buttons 
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

// Landing screen dust particle parallax effect
// Based on source: https://codepen.io/SabAsan/pen/gOaRJzV

function Parallax(options) {
    options = options || {};
    this.nameSpaces = {
        wrapper: options.wrapper || '.parallax',
        layers: options.layers || '.parallax-layer',
        deep: options.deep || 'data-parallax-deep'
    };
    this.init = function () {
        var self = this,
            parallaxWrappers = document.querySelectorAll(this.nameSpaces.wrapper);
        for (var i = 0; i < parallaxWrappers.length; i++) {
            (function (i) {
                parallaxWrappers[i].addEventListener('mousemove', function (e) {
                    var x = e.clientX,
                        y = e.clientY,
                        layers = parallaxWrappers[i].querySelectorAll(self.nameSpaces.layers);
                    for (var j = 0; j < layers.length; j++) {
                        (function (j) {
                            var deep = layers[j].getAttribute(self.nameSpaces.deep),
                                disallow = layers[j].getAttribute('data-parallax-disallow'),
                                itemX = (disallow && disallow === 'x') ? 0 : x / deep,
                                itemY = (disallow && disallow === 'y') ? 0 : y / deep;
                            if (disallow && disallow === 'both') return;
                            layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
                        })(j);
                    }
                })
            })(i);
        }
    };
    this.init();
    return this;
}
window.addEventListener('load', function () {
    new Parallax();
});

/*--------------------------------- Drum Console ------------------------------*/

//Hide and show pads

//Show kick pads only on load
$(".snare-pads, .hihat-pads, .openhh-pads").hide();

//Show kick pads only when clicked
$("#kick").click(function () {
    $(".snare-pads, .hihat-pads, .openhh-pads").hide();
    $(".kick-pads").show();
    $(this).addClass("trigger");
    $("#hi-hats, #snare, #open-hh").removeClass("trigger");
});

//Show snare pads only when clicked
$("#snare").click(function () {
    $(".kick-pads, .hihat-pads, .openhh-pads").hide();
    $(".snare-pads").show();
    $(this).addClass("trigger");
    $("#hi-hats, #open-hh, #kick").removeClass("trigger");
});

//Show hi-hat pads only when clicked
$("#hi-hats").click(function () {
    $(".snare-pads, .kick-pads, .openhh-pads").hide();
    $(".hihat-pads").show("show");
    $(this).addClass("trigger");
    $("#open-hh, #snare, #kick").removeClass("trigger");
});

//Show open hi-hat pads only when clicked
$("#open-hh").click(function () {
    $(".snare-pads, .hihat-pads, .kick-pads").hide();
    $(".openhh-pads").show("show");
    $(this).addClass("trigger");
    $("#hi-hats, #snare, #kick").removeClass("trigger");
});


// Return to home screen when drum console home icon is clicked 

$(".home-btn").click(function () {
    sound.play("exit");
    // Sets timeout so exit sound plays in full before reload
    //ensures that the function will always be called in the context of window.location
    //SRC: https://stackoverflow.com/questions/39407803/why-does-settimeoutlocation-reload-throw-a-typeerror/39407908
    window.setTimeout(window.location.reload.bind(window.location), 500);
});


// Function to decrease score by one and update shot counter text
function minusShots() {
    shots--;
    $(".digits").text(shots);
}

// Funtcion to open try again modal and play sound
function youLose() {
    if (shots == 0) {
        $("#tryAgainModal").modal("show");
        sound.play('backSpin');
    };
};

// Reset
function resetConsole() {
    shots = retry;
    $(".digits").text(retry);
    sound.play('backSpin');
    // Clears all pads when reset
    $(".kick-drum, .snare-drum, .hihat-drum, .openhh-drum").removeClass("correct wrong");
    // Revert back to kick instrument pads
    $(".snare-pads, .hihat-pads, .openhh-pads").hide();
    $(".kick-pads").show();
    $("#kick").addClass("trigger");
    $("#hi-hats, #snare, #open-hh").removeClass("trigger");
};

/*--------------------------------- Step Sequencer ------------------------------*/

class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".drum-pad");
        this.playButton = document.querySelector(".play-btn");
        this.tryAgainButton = document.querySelector(".try-again");
        this.index = 0;
        this.bpm = 160;
    }

    // On/Off toggle for pads
    activePad() {
        if (this.classList.contains("playing")) {
            this.classList.toggle("correct");
        } else {
            this.classList.add("wrong");
            minusShots();
            youLose();
        }
    }

    cycle() {
        let step = this.index % 16;
        const activePad = document.querySelectorAll(`.pad-${step}`);

        // Loop over the pads
        activePad.forEach(beat => {
            beat.style.animation = `pulse .65s`;
            // Check if pads are should play sound based on arrays from setPattern function
            if (beat.classList.contains("playing")) {
                // Check each sound in here
                if (beat.classList.contains("kick-drum")) {
                    sound.play('kick');
                }
                if (beat.classList.contains("snare-drum")) {
                    sound.play('snare');
                }
                if (beat.classList.contains("hihat-drum")) {
                    sound.play('hihat');
                }
                if (beat.classList.contains("openhh-drum")) {
                    sound.play('openhh');
                }
            }
        });
        this.index++;
    }

    start() {
        const interval = (60 / this.bpm) * 500;
        // Check if it is playing
        if (!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.cycle();
            }, interval);
        } else {
            //Clear the Interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
            // Reset index back to 0 - Pad plays from beginning
            this.index = 0;
            resetConsole();
        }
        // Toggle vinyl spin, needle arm rotation and play button scale animations when clicked
        // Activate drum pads
        $(".vinyl").toggleClass("spin");
        $(".needle-arm").toggleClass("rotate");
        $(".play-btn").toggleClass("scale");
        $("#all-pads").toggleClass("disabled-drum-pad");
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playButton.innerText = "RESET";
            this.playButton.classList.add("retry-btn");
        } else {
            this.playButton.innerText = "PLAY";
            this.playButton.classList.remove("retry-btn");
            // Resets shots to retry value so minusShots() function begins at original number 
            // Resets the counter to the correct value for each difficulty
            // Plays vinyl back spin sound
        }
    }

}

const drumKit = new DrumKit();

// Adds animation to each pad when looped over
drumKit.pads.forEach(pad => {
    pad.addEventListener("click", drumKit.activePad);
    pad.addEventListener("animationend", function () {
        this.style.animation = "";
    });
});

// Plays step sequencer when play button is clicked
// Changes Play button to Stop button when clicked
drumKit.playButton.addEventListener("click", function () {
    drumKit.updateBtn();
    drumKit.start();
});

drumKit.tryAgainButton.addEventListener("click", function () {
    drumKit.updateBtn();
    drumKit.start();
});


//Howler.js

var sound = new Howl({
    src: ["./assets/sounds/btb-sprite-2.mp3", "./assets/sounds/btb-sprite-2.ogg"],
    sprite: {
        kick: [0, 240],
        snare: [250, 240],
        hihat: [500, 240],
        openhh: [750, 240],
        backSpin: [1000, 900],
        easy: [2000, 400],
        normal: [2500, 450],
        hard: [3000, 520],
        exit: [3750, 420],
        start: [4250, 550],
        error: [5000, 460],
        button: [5500, 500]
    }
});

// Plays game title loop
sound.play("btbTitle");

// Hover Sounds

// Plays sound when hovering over disks
$("#start-game-easy").hover(function () {
    sound.play('easy');
}, function () {
    sound.play('');
});

$("#start-game-normal").hover(function () {
    sound.play('normal');
}, function () {
    sound.play('');
});

$("#start-game-hard").hover(function () {
    sound.play('hard');
}, function () {
    sound.play('');
});

$(".btn-how-to-play, .btn-start-game").hover(function () {
    sound.play('button');
}, function () {
    sound.play('');
});

// JSON

function getData(loadBeats) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "beats.json");
    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            loadBeats(JSON.parse(this.responseText));
        }
    };
}

function setPatterns(beats) {
    let beatIndex = [];

    // Creates random number between 0 and 19 to be used to select each json object based on index of 20 beat objeacts
    let randomNumber = Math.floor((Math.random() * 20));
    //Pushed random number into beatIndex to be used as the index selector for the beat
    beatIndex.push(randomNumber);

    // Creates an array from the string of numbers in the json boject for each drum and stores beat pattern array for each drum in a variable
    let kickArray = Array.from(String((beats)[beatIndex].kick), Number);
    let snareArray = Array.from(String((beats)[beatIndex].snare), Number);
    let hihatArray = Array.from(String((beats)[beatIndex].closedHat), Number);
    let openhhArray = Array.from(String((beats)[beatIndex].openHat), Number);

    // For loop loops through the length of the drum arrays
    // Then pushes the number to the pads which activates the correct pad
    // The number 1 in the json object string is active
    // The number 0 in the json object string is not active
    // If the pad is = 1 the playing class is applied - this will in turn play the correct sound in the sequencer
    for (let i = 0; i < kickArray.length; i++) {
        if (kickArray[i] === 1) {
            $(`.kick-drum.pad-${i}`).addClass("playing");
        }
        if (snareArray[i] === 1) {
            $(`.snare-drum.pad-${i}`).addClass("playing");
        }
        if (hihatArray[i] === 1) {
            $(`.hihat-drum.pad-${i}`).addClass("playing");
        }
        if (openhhArray[i] === 1) {
            $(`.openhh-drum.pad-${i}`).addClass("playing");
        }
    }
}

// Sets the pad pattern
getData(setPatterns);