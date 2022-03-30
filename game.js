var buttonColours = ["red", "blue", "green", "yellow"]

var gamePattern = []
var userClickedPattern = []

var ifStarted = false;
var level = 0;

$(document).keypress(function() {
    if (ifStarted == false) {
        ifStarted = true;
            $("#level-title").text("Level " + level);
            nextSeq();
    } 
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSeq();
        }, 1000);
      }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function nextSeq() {
    userClickedPattern = [];

    var randomNumber = Math.random();
    randomNumber = Math.floor(randomNumber*4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    level += 1;
    $("#level-title").text("Level " + level);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    ifStarted = false;
}
