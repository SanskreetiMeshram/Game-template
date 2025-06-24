let round = 0;
let userScore = 0;
let computerScore = 0;

function play(userChoice) {
  if (round >= 5) return; // Stop after 5 rounds

  const choices = ["rock", "paper", "scissors"];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById("user-choice").textContent = `You chose: ${userChoice}`;
  document.getElementById("computer-choice").textContent = `Computer chose: ${computerChoice}`;

  let winner = "";

  if (userChoice === computerChoice) {
    winner = "Draw!";
  } else if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "scissors" && computerChoice === "paper") ||
    (userChoice === "paper" && computerChoice === "rock")
  ) {
    winner = "You win this round!";
    userScore++;
  } else {
    winner = "Computer wins this round!";
    computerScore++;
  }

  round++;
  document.getElementById("rounds").textContent = `Round: ${round} / 5`;
  document.getElementById("round-winner").textContent = winner;
  document.getElementById("score").textContent = `Score → You: ${userScore} | Computer: ${computerScore}`;

  if (round === 5) {
    showFinalResult();
  }
}

function showFinalResult() {
  let finalMessage = "";
  if (userScore > computerScore) {
    finalMessage = "🎉 You won the game!";
  } else if (userScore < computerScore) {
    finalMessage = "😢 Computer won the game!";
  } else {
    finalMessage = "🤝 It's a tie!";
  }

  document.getElementById("final-result").textContent = finalMessage;

  // Disable buttons
  document.getElementById("rock").disabled = true;
  document.getElementById("paper").disabled = true;
  document.getElementById("scissors").disabled = true;
}
