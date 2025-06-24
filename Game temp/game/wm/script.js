const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');

let score = 0;
let currentMole = null;
let gameTime = 30;
let timer, moleTimer;

function randomHole() {
  return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
  holes.forEach(h => h.classList.remove('mole'));
  const mole = randomHole();
  mole.classList.add('mole');
  currentMole = mole.id;
}

function whack(event) {
  if (event.target.classList.contains('mole')) {
    score++;
    scoreDisplay.textContent = score;
    event.target.classList.remove('mole');
  }
}

function startGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameTime = 30;
  timeDisplay.textContent = gameTime;

  timer = setInterval(() => {
    gameTime--;
    timeDisplay.textContent = gameTime;
    if (gameTime <= 0) {
      clearInterval(timer);
      clearInterval(moleTimer);
      alert("⏰ Time's up! Your score is: " + score);
      saveScore(score);
    }
  }, 1000);

  moleTimer = setInterval(showMole, 700);
}

holes.forEach(h => h.addEventListener('click', whack));

function saveScore(score) {
  let scores = JSON.parse(localStorage.getItem("gameScores")) || [];
  scores.push({ name: "You", score: score });
  localStorage.setItem("gameScores", JSON.stringify(scores));
}
