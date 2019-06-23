var game = new Game();

var startpage = document.querySelector(".startPage");
var restartpage = document.querySelector(".restartPage");
var startBtn = document.querySelector(".startBtn");
var restartBtn = document.querySelector(".restartBtn");
var scoreEl = document.querySelector(".scoreNum");

startpage.style.display = "flex";
restartpage.style.display = "none";

alert("a");

KonsoleWrapper.onUsersUpdated = users => {
  game.start(users);
  console.log;
  users[0].onJoystickUpdate = joystickData => {
    console.log(joystickData);
  };
};

startBtn.addEventListener("click", function() {
  startpage.style.display = "none";
});

restartBtn.addEventListener("click", function() {
  restartpage.style.display = "none";
  game.restart();
});

game.failCallback = function(score) {
  restartpage.style.display = "flex";
  scoreEl.innerHTML = score;
};
