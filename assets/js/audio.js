//Howler.js

var sound = new Howl({
    src: ["./assets/sounds/btb-sprite-4.mp3", "./assets/sounds/btb-sprite-4.ogg"],
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
        button: [5500, 500],
        blip1: [6000, 240],
        blip2: [6250, 240],
        blip3: [6500, 240],
        success: [6750, 500],
        yeah: [7250, 350],
        letsGo: [7750, 550],
        yeah2: [8500, 700],
        btbTitle: [9500, 2500, true],
        nextLevel: [12500, 2000]
    }
});

// Plays game title loop
setTimeout(function() {
    sound.play("btbTitle");
},200);

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

$(".btn-how-to-play, .btn-start-game, .btn-arcade").hover(function () {
    sound.play('button');
}, function () {
    sound.play('');
});

// Play start sound when clicked
$(".btn-start-game, .btn-how-to-play").click(function () {
    sound.stop();
    sound.play('start');
    sound.play('nextLevel');
});

$(".btn-how-to-play, #ready").click(function () {
    sound.play('start');
});
