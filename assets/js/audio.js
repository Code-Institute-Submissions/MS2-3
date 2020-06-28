//Howler.js

var sound = new Howl({
    src: ["./assets/sounds/btb-sprite.mp3", "./assets/sounds/btb-sprite.ogg"],
    sprite: {
        kick: [0, 240],
        snare: [250, 240],
        hihat: [500, 240],
        openhh: [750, 240],
        backSpin: [1000, 900],
        difficulty: [2000, 400],
        exit: [2500, 420],
        start: [3000, 550],
        error: [3750, 460],
        yeah: [4250, 500],
        hoverButton: [5000, 250],
        button: [5500, 250],
        beep: [6000, 200],
        finalRound: [6100, 1400],
        btbTitle: [8000, 2500, true],
        titleFade: [11000, 2500],
        crowd: [14000, 5000]
    }
});

// Plays game title loop
setTimeout(function() {
    sound.play("btbTitle");
},200);

// Plays sound when hovering over disks
$("#start-game-easy").hover(function () {
    sound.play('difficulty');
}, function () {
    sound.play('');
});

$("#start-game-normal").hover(function () {
    sound.play('difficulty');
}, function () {
    sound.play('');
});

$("#start-game-hard").hover(function () {
    sound.play('difficulty');
}, function () {
    sound.play('');
});

$(".btn-how-to-play, .btn-start-game, .btn-arcade").hover(function () {
    sound.play('button');
}, function () {
    sound.play('');
});

$(".how-to-btn, .home-btn, .close").hover(function () {
    sound.play('hoverButton');
}, function () {
    sound.play('');
});

$("#beep-sound").hover(function () {
    sound.play('beep');
}, function () {
    sound.play('');
});

// Play start sound when clicked
$(".btn-start-game, .btn-how-to-play").click(function () {
    sound.stop();
    sound.play('start');
    sound.play('titleFade');
});

$(".btn-how-to-play, .btn-start-game").click(function () {
    $("#boombox").removeClass("boom-box bounce");
});

$("#ready, .close").click(function () {
    if ($("#landing").hasClass("d-flex")) {
        $("#boombox").addClass("boom-box bounce");
        sound.play('btbTitle');
    }
});


