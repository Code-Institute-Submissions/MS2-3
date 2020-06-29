// Global Variables
let kickArray = [];
let snareArray = [];
let hihatArray = [];
let openhhArray = [];
let sumOfKickArray = 0;
let sumOfSnareArray = 0;
let sumOfHihatArray = 0;
let sumOfOpenHHArray = 0;

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

    // Gets the sum of the each array and assigns them to variables
    sumOfKickArray = kickArray.reduce(function addingKick(a, b) {
        return a + b;
    }, 0);

    sumOfSnareArray = snareArray.reduce(function addingSnare(a, b) {
        return a + b;
    }, 0);

    sumOfHihatArray = hihatArray.reduce(function addingHiHat(a, b) {
        return a + b;
    }, 0);

    sumOfOpenHHArray = openhhArray.reduce(function addingOpenHH(a, b) {
        return a + b;
    }, 0);

    /* For loop loops through the length of the drum arrays
    * Then pushes the number to the pads which activates the correct pad
    * The number 1 in the json object string is active
    * The number 0 in the json object string is not active
    * If the pad is = 1 the playing class is applied - this will in turn play the correct sound in the sequencer
    */
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

/*--------------------------------- Step Sequencer ------------------------------*/

/* Based on the step sequencer created by Dev Ed as part of the Creative Javascript
* Course: https://developedbyed.com/p/the-creative-javascript-course
*/


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
            this.classList.add("correct");
            if (this.classList.contains("correct")) {
                this.classList.add("pointer-none");
            }
            padActiveCalculator();
            advancePads();
        } else {
            this.classList.add("wrong");
            if (this.classList.contains("wrong")) {
                this.classList.add("pointer-none");
            }
            minusShots();
            youLose();
        }
    }

    cycle() {
        let step = this.index % 16;
        const activePad = document.querySelectorAll(`.pad-${step}`);

        // Loop over the pads
        activePad.forEach(beat => {
            beat.style.animation = `pulse .3s`;
            // Check if pads are should play sound based on arrays from setPattern function
            if (beat.classList.contains("playing")) {
                // Check each sound in here
                if (beat.classList.contains("kick-drum") && $("#kick").hasClass("trigger")) {
                    if (beat.classList.contains("kick-drum") && beat.classList.contains("correct")) {
                        sound.play("kick");
                    } else {
                        sound.play("beep");
                    }
                }
                if (beat.classList.contains("snare-drum") && $("#snare").hasClass("trigger")) {
                    if (beat.classList.contains("snare-drum") && beat.classList.contains("correct")) {
                        sound.play("snare");
                    } else {
                        sound.play("beep");
                    }
                }
                if (beat.classList.contains("hihat-drum") && $("#hi-hats").hasClass("trigger")) {
                    if (beat.classList.contains("hihat-drum") && beat.classList.contains("correct")) {
                        sound.play("hihat");
                    } else {
                        sound.play("beep");
                    }
                }
                if (beat.classList.contains("openhh-drum") && $("#open-hh").hasClass("trigger")) {
                    if (beat.classList.contains("openhh-drum") && beat.classList.contains("correct")) {
                        sound.play("openhh");
                    } else {
                        sound.play("beep");
                    }
                }
            }
        });
        this.index++;
    }

    start() {
        let interval = (setTempo / this.bpm) * 500;
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
            this.playButton.innerText = "PAUSE";
            this.playButton.classList.add("pause-btn");
        } else {
            this.playButton.innerText = "PLAY";
            this.playButton.classList.remove("pause-btn");
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