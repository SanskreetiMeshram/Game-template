let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let xWins = 0;
let oWins = 0;

const statusDisplay = document.getElementById("status");
const scoreDisplay = document.getElementById("score");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // columns
  [0,4,8], [2,4,6]           // diagonals
];

function makeMove(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWinner()) {
    statusDisplay.textContent = `🎉 Player ${currentPlayer} wins!`;
    if (currentPlayer === "X") xWins++;
    else oWins++;
    updateScore();
    gameActive = false;
    setTimeout(resetGame, 2000); // Auto-reset after 2 seconds
    return;
  }

  if (!board.includes("")) {
    statusDisplay.textContent = "🤝 It's a draw!";
    gameActive = false;
    setTimeout(resetGame, 2000); // Auto-reset after draw
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winConditions.some(combination => {
    const [a, b, c] = combination;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".cell").forEach(cell => cell.textContent = "");
  statusDisplay.textContent = "Player X's turn";
}

function updateScore() {
  scoreDisplay.textContent = `Score → X: ${xWins} | O: ${oWins}`;
}
