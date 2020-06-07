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
    $(".parallax").addClass("d-none");
});

// Set shots counter for each difficulty
$("#start-game-easy").click(function () {
    $(".digits").text("20");
});

$("#start-game-normal").click(function () {
    $(".digits").text("10");
});

$("#start-game-hard").click(function () {
    $(".digits").text("5");
});

// Flip records when hovering difficulty select buttons 
$("#start-game-easy").hover(
    function() {
        $("#bronze").addClass("flip");
    },
    function() {
        $("#bronze").removeClass("flip");
    }
);

$("#start-game-normal").hover(
    function() {
        $("#silver").addClass("flip");
    },
    function() {
        $("#silver").removeClass("flip");
    }
);

$("#start-game-hard").hover(
    function() {
        $("#gold").addClass("flip");
    },
    function() {
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
    window.location.reload()
});

// Toggle vinyl spin, needle arm rotation and play button scale animations when clicked
// Activate drum pads
$(".play-btn").click(function () {
    $(".vinyl").toggleClass("spin");
    $(".needle-arm").toggleClass("rotate");
    $(this).toggleClass("scale");
    $("#all-pads").toggleClass("disabled-drum-pad");
});

/*--------------------------------- Step Sequencer ------------------------------*/

class DrumKit {
    constructor() {
        this.pads = document.querySelectorAll(".drum-pad");
        this.playButton = document.querySelector(".play-btn");
        this.kickAudio = document.querySelector(".kick-audio");
        this.snareAudio = document.querySelector(".snare-audio");
        this.hihatAudio = document.querySelector(".hihat-audio");
        this.openhhAudio = document.querySelector(".openhh-audio");
        this.index = 0;
        this.bpm = 160;
    }

    // On/Off toggle for pads
    activePad() {
        this.classList.toggle("selected");
    }

    cycle() {
        let step = this.index % 16;
        const activePad = document.querySelectorAll(`.pad-${step}`);

        // Loop over the pads
        activePad.forEach(beat => {
            beat.style.animation = `pulse .65s`;
            // Check if pads are selected
            if (beat.classList.contains("selected")) {
                // Check each sound in here
                if (beat.classList.contains("kick-drum")) {
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if (beat.classList.contains("snare-drum")) {
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if (beat.classList.contains("hihat-drum")) {
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
                if (beat.classList.contains("openhh-drum")) {
                    this.openhhAudio.currentTime = 0;
                    this.openhhAudio.play();
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
        }
    }

    updateBtn() {
        if (!this.isPlaying) {
            this.playButton.innerText = "STOP";
            this.playButton.classList.add("retry-btn");
        } else {
            this.playButton.innerText = "PLAY";
            this.playButton.classList.remove("retry-btn");
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