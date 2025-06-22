var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gameStarted = false;
var level = 0;

$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

  animatePress(userChosenColour);

  playSound(userChosenColour);

  $("#" + userChosenColour).fadeOut(100).fadeIn(100);
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play()
};

function nextSequence(){
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  userClickedPattern = [];
};

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  }, 100)
};

$(document).keydown(function(){
  if (!gameStarted){
    $("h1").text("Level " + level);
    nextSequence();
    gameStarted = true;
  };
});

function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

};

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
};