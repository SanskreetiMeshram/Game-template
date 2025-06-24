const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple"];
let target = "";
let currentRound = 0;
let score = 0;
const totalRounds = 5;

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateGame() {
  if (currentRound >= totalRounds) {
    document.getElementById("result").textContent = `🎉 Game Over! You scored ${score} out of ${totalRounds}`;
    document.getElementById("target-color").textContent = "Game Finished!";
    const boxes = document.querySelectorAll(".color-box");
    boxes.forEach(box => {
      box.style.pointerEvents = "none";
    });
    return;
  }

  const targetColor = randomColor();
  target = targetColor;
  document.getElementById("target-color").textContent = targetColor;

  const boxes = document.querySelectorAll(".color-box");
  const correctIndex = Math.floor(Math.random() * boxes.length);

  boxes.forEach((box, i) => {
    const color = i === correctIndex ? targetColor : randomColor();
    box.style.backgroundColor = color.toLowerCase();
    box.setAttribute("data-color", color);
    box.style.pointerEvents = "auto"; // enable clicks
  });

  document.getElementById("result").textContent = `Round ${currentRound + 1} of ${totalRounds}`;
}

function checkColor(box) {
  const chosenColor = box.getAttribute("data-color");
  const boxes = document.querySelectorAll(".color-box");

  if (chosenColor === target) {
    document.getElementById("result").textContent = "✅ Correct!";
    score++;
  } else {
    document.getElementById("result").textContent = `❌ Wrong! It was ${target}`;
  }

  // Disable clicks to prevent double answers
  boxes.forEach(box => {
    box.style.pointerEvents = "none";
  });

  currentRound++;

  setTimeout(generateGame, 1500); // Start next round after 1.5s
}

// Start the game when page loads
window.onload = generateGame;
