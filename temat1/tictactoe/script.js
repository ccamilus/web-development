const board = document.getElementById("board");
const display = document.getElementById("display");
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  resetGame();
});
const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let freeFields = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xPlayer = [];
let oPlayer = [];
let currentMove = "x";
let isGameInProgress = true;
let gameStatus = "playing";
let winningPlayer = "";

function gen() {
  for (let i = 0; i < 9; i++) {
    const square = document.createElement("div");
    square.className = "playingSquare";
    square.dataset.value = i;
    square.addEventListener("click", () => {
      move(square, i);
      checkGameStatus();
      updateDisplay();
    });
    board.appendChild(square);
  }
  updateDisplay();
}

function move(square, index) {
  if (gameStatus !== "playing") return;
  if (!freeFields.includes(index)) {
    return;
  }
  switch (currentMove) {
    case "x":
      square.innerText = "x";
      currentMove = "o";
      xPlayer += index;
      freeFields = freeFields.filter((number) => number !== index);
      break;
    case "o":
      square.innerText = "o";
      currentMove = "x";
      oPlayer += index;
      freeFields = freeFields.filter((number) => number !== index);
      break;
  }
}

function checkGameStatus() {
  if (gameStatus !== "playing") return;
  winCombinations.forEach((combination) => {
    const xPlayerResult = combination.every((number) => {
      return xPlayer.includes(number);
    });
    const oPlayerResult = combination.every((number) => {
      return oPlayer.includes(number);
    });
    if (xPlayerResult) {
      colorSquares(combination);
      gameStatus = "won";
      winningPlayer = "x";
    }
    if (oPlayerResult) {
      colorSquares(combination);
      gameStatus = "won";
      winningPlayer = "o";
    }
  });
  if (freeFields.length === 0 && gameStatus !== "won") {
    gameStatus = "draw";
  }
}

function colorSquares(combination) {
  if (gameStatus !== "playing") return;
  combination.forEach((number) => {
    const sq = document.querySelector(`[data-value="${number}"]`);
    sq.style.color = "#f54542";
  });
}

function updateDisplay() {
  switch (gameStatus) {
    case "playing":
      display.innerText = currentMove + " player move";
      break;
    case "draw":
      display.innerText = "draw";
      break;
    case "won":
      display.innerText = winningPlayer + " player won";
      break;
  }
}

function resetGame() {
  const squares = document.getElementsByClassName("playingSquare");
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerText = "";
    squares[i].style.color = "#555555";
  }
  freeFields = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  xPlayer = [];
  oPlayer = [];
  currentMove = "x";
  isGameInProgress = true;
  gameStatus = "playing";
  winningPlayer = "";
  updateDisplay();
}
