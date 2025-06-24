const board = document.getElementById("game-board");
const message = document.getElementById("message");

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

function startGame() {
  board.innerHTML = "";
  message.textContent = "Player 1's Turn";
  matches = 0;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
  currentPlayer = 1;
  player1Score = 0;
  player2Score = 0;

  const icons = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍋"];
  cards = [...icons, ...icons];

  shuffle(cards);

  cards.forEach((icon, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-icon", icon);
    card.setAttribute("data-index", index);
    card.addEventListener("click", flipCard);
    board.appendChild(card);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function flipCard() {
  if (lockBoard || this === firstCard || this.classList.contains("flipped")) return;

  this.textContent = this.getAttribute("data-icon");
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.getAttribute("data-icon") === secondCard.getAttribute("data-icon");

  if (isMatch) {
    matches++;
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    if (currentPlayer === 1) {
      player1Score++;
    } else {
      player2Score++;
    }

    resetTurn();

    if (matches === 6) {
      showFinalResult();
    }
  } else {
    setTimeout(() => {
      firstCard.textContent = "";
      secondCard.textContent = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      // Switch player turn
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      message.textContent = `Player ${currentPlayer}'s Turn`;

      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showFinalResult() {
  let resultMessage = `🏁 Game Over! Score → Player 1: ${player1Score} | Player 2: ${player2Score}\n`;

  if (player1Score > player2Score) {
    resultMessage += "🎉 Player 1 Wins!";
  } else if (player2Score > player1Score) {
    resultMessage += "🎉 Player 2 Wins!";
  } else {
    resultMessage += "🤝 It's a Draw!";
  }

  message.textContent = resultMessage;

  // Disable board
  const allCards = document.querySelectorAll(".card");
  allCards.forEach(card => card.removeEventListener("click", flipCard));
}

// Start game on page load
window.onload = startGame;
