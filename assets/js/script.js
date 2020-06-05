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
    $("#kick").addClass("trigger");
    $("#hi-hats, #snare, #open-hh").removeClass("trigger");
});

//Show snare pads only when clicked
$("#snare").click(function () {
    $(".kick-pads, .hihat-pads, .openhh-pads").hide();
    $(".snare-pads").show();
    $("#snare").addClass("trigger");
    $("#hi-hats, #open-hh, #kick").removeClass("trigger");
});

//Show hi-hat pads only when clicked
$("#hi-hats").click(function () {
    $(".snare-pads, .kick-pads, .openhh-pads").hide();
    $(".hihat-pads").show("show");
    $("#hi-hats").addClass("trigger");
    $("#open-hh, #snare, #kick").removeClass("trigger");
});

//Show open hi-hat pads only when clicked
$("#open-hh").click(function () {
    $(".snare-pads, .hihat-pads, .kick-pads").hide();
    $(".openhh-pads").show("show");
    $("#open-hh").addClass("trigger");
    $("#hi-hats, #snare, #kick").removeClass("trigger");
});


// Return to home screen when drum console home icon is clicked 

$(".home-btn").click(function () {
    window.location.reload()
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
    }
}