$(document).ready(function() {
  const game = new Game();

  let isFastSpeed = false;

  $("#change-game-state-button").click(function() {
    if (game.isStarted()) {
      if (game.isRunning()) {
        game.pauseGame();
        $(this).text("Resume Game");
      } else {
        game.resumeGame();
        $(this).text("Pause Game");
      }
    } else {

      if (game.isGameOver()) {
        game.startNewGame();
        $(this).text("Pause Game");
        console.log("start new game");
      } else {
        game.startGame();
        Util.showElement("next-tetromino-container");
        Util.showElement("score-container");
        $(this).text("Pause Game");
      }
    }
    $(this).blur();
  });

  $("body").keydown(function(e) {
    if (game.isRunning()) {
      //Spacebar key pressed
      if (e.which === 32) {
        game.moveAllWayDown();
      }

      switch (e.keyCode) {
        case 27:
          //Escape key pressed
          if (game.isPaused()) {
            game.resumeGame();
            Util.hideElement("pause-modal-overlay");
          } else {
            game.pauseGame();
            Util.showElement("pause-modal-overlay");
          }
          break;
        case 37:
          //Left key pressed
          game.moveLeft();
          break;
        case 38:
          //Up key pressed
          game.rotateTetromino();
          break;
        case 39:
          //Right key pressed
          game.moveRight();
          break;
        case 40:
          //Down key pressed
          if (!isFastSpeed) {
            isFastSpeed = true;
            game.moveFaster();
          }
          break;
      }
    }
  }).keyup(function(e) {
    if (game.isRunning()) {
      if (e.keyCode === 40) {
        if (isFastSpeed) {
          isFastSpeed = false;
          game.moveNormal();
        }
      }
    }
  });

  $("#resume-game-button").click( () => {
    game.resumeGame();
    Util.hideElement("pause-modal-overlay");
  });

  $("#game-over-button").click( () => {
    Util.hideElement("message-modal-overlay");
  });
});
