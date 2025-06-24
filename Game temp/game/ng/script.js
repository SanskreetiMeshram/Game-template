let correctNumber;
let chancesLeft = 5;
const totalBoxes = 12;

function setupGame() {
  const grid = document.getElementById("grid");
  grid.innerHTML = "";
  document.getElementById("result").textContent = "";
  document.getElementById("status").textContent = "Chances Left: 5";
  chancesLeft = 5;
  correctNumber = Math.floor(Math.random() * totalBoxes) + 1;

  for (let i = 1; i <= totalBoxes; i++) {
    const btn = document.createElement("button");
    btn.className = "box";
    btn.textContent = i;
    btn.onclick = () => checkGuess(i, btn);
    grid.appendChild(btn);
  }
}

function checkGuess(number, button) {
  if (number === correctNumber) {
    document.getElementById("result").textContent = `🎉 Correct! The number was ${correctNumber}`;
    disableAllButtons();
  } else {
    chancesLeft--;
    button.disabled = true;
    const hint = number > correctNumber ? "📉 Too High!" : "📈 Too Low!";
    document.getElementById("status").textContent = `Chances Left: ${chancesLeft} — ${hint}`;

    if (chancesLeft === 0) {
      document.getElementById("result").textContent = `💥 Game Over! The number was ${correctNumber}`;
      disableAllButtons();
      setTimeout(setupGame, 2000); // Restart after 2 seconds
    }
  }
}

function disableAllButtons() {
  const allButtons = document.querySelectorAll(".box");
  allButtons.forEach(btn => btn.disabled = true);
}

function resetGame() {
  setupGame();
}

window.onload = setupGame;
