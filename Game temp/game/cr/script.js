const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");
const resultDisplay = document.getElementById("result");

let player = { speed: 5, score: 0, x: 180 };
let keys = {};
let gameRunning = true;
let startTime;

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

function startGame() {
  gameArea.innerHTML = `<div class="score" id="score">Score: 0</div><div class="car" id="car"></div>`;
  resultDisplay.innerHTML = ""; // clear result
  player = { speed: 5, score: 0, x: 180 };
  gameRunning = true;
  startTime = Date.now();

  for (let i = 0; i < 5; i++) {
    let line = document.createElement("div");
    line.classList.add("roadLine");
    line.style.top = (i * 120) + "px";
    gameArea.appendChild(line);
  }

  for (let i = 0; i < 3; i++) {
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.top = (i * -200) + "px";
    enemy.style.left = Math.floor(Math.random() * 360) + "px";
    gameArea.appendChild(enemy);
  }

  window.requestAnimationFrame(gamePlay);
}

function moveLines() {
  let lines = document.querySelectorAll(".roadLine");
  lines.forEach((line) => {
    let top = parseInt(line.style.top);
    top += player.speed;
    if (top > 600) top = -60;
    line.style.top = top + "px";
  });
}

function moveEnemies(car) {
  let enemies = document.querySelectorAll(".enemy");
  enemies.forEach((enemy) => {
    let top = parseInt(enemy.style.top);
    top += player.speed;
    if (top > 600) {
      top = -200;
      enemy.style.left = Math.floor(Math.random() * 360) + "px";
    }
    enemy.style.top = top + "px";

    if (isCollide(car, enemy)) {
      endGame();
    }
  });
}

function isCollide(a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}

function gamePlay() {
  if (!gameRunning) return;

  const car = document.getElementById("car");

  moveLines();
  moveEnemies(car);

  if (keys["ArrowLeft"] && player.x > 0) player.x -= player.speed;
  if (keys["ArrowRight"] && player.x < 360) player.x += player.speed;

  car.style.left = player.x + "px";
  player.score++;

  let elapsed = Math.floor((Date.now() - startTime) / 1000); // seconds
  document.getElementById("score").innerText = `Score: ${player.score} | Time: ${elapsed}s`;

  window.requestAnimationFrame(gamePlay);
}

function endGame() {
  gameRunning = false;
  let elapsed = Math.floor((Date.now() - startTime) / 1000); // seconds
  resultDisplay.innerHTML = `<strong>🏁 Final Score: ${player.score} <br>⏱️ Time: ${elapsed} seconds</strong><br>Restarting in 3s...`;
  setTimeout(startGame, 3000); // Restart after 3 seconds
}

// Start game on load
window.onload = startGame;
