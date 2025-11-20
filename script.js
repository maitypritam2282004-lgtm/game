const boardEl = document.querySelector(".board");
const statusLabel = document.getElementById("statusLabel");
const undoBtn = document.getElementById("undoBtn");
const newMatchBtn = document.getElementById("newMatchBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const cellTemplate = document.getElementById("cellTemplate");

const scoreXEl = document.getElementById("scoreX");
const scoreOEl = document.getElementById("scoreO");
const scoreTieEl = document.getElementById("scoreTie");

let boardState = Array(9).fill("");
let currentPlayer = "X";
let isLocked = false;
let moveHistory = [];
const scores = {
  X: 0,
  O: 0,
  tie: 0,
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createBoard() {
  boardEl.innerHTML = "";
  for (let i = 0; i < 9; i += 1) {
    const cell = cellTemplate.content
      .querySelector("button")
      .cloneNode(true);
    cell.dataset.index = i;
    cell.addEventListener("click", () => handleMove(i, cell));
    boardEl.appendChild(cell);
  }
}

function handleMove(index, cell) {
  if (isLocked || boardState[index]) return;
  boardState[index] = currentPlayer;
  moveHistory.push(index);
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());
  cell.disabled = true;
  undoBtn.disabled = moveHistory.length === 0;

  const winCombo = findWinner();
  if (winCombo) {
    finishRound(currentPlayer, winCombo);
    return;
  }

  if (boardState.every(Boolean)) {
    finishRound("tie");
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`${describePlayer(currentPlayer)}, it's your move.`);
}

function describePlayer(player) {
  return player === "X" ? "Player X" : "Player O";
}

function findWinner() {
  return winningCombos.find((combo) => {
    const [a, b, c] = combo;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function finishRound(result, combo = []) {
  isLocked = true;
  undoBtn.disabled = true;

  if (result === "tie") {
    scores.tie += 1;
    scoreTieEl.textContent = scores.tie;
    updateStatus("It's a tie! Play again?");
    return;
  }

  scores[result] += 1;
  if (result === "X") {
    scoreXEl.textContent = scores.X;
  } else {
    scoreOEl.textContent = scores.O;
  }

  combo.forEach((index) => {
    const cell = boardEl.querySelector(`[data-index="${index}"]`);
    cell.classList.add("win");
  });

  updateStatus(`${describePlayer(result)} wins this round!`);
}

function updateStatus(message) {
  statusLabel.textContent = message;
}

function resetBoard(keepScore = true) {
  boardState = Array(9).fill("");
  currentPlayer = "X";
  isLocked = false;
  moveHistory = [];
  undoBtn.disabled = true;

  boardEl.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.disabled = false;
    cell.classList.remove("x", "o", "win");
  });

  if (!keepScore) {
    scores.X = 0;
    scores.O = 0;
    scores.tie = 0;
    scoreXEl.textContent = "0";
    scoreOEl.textContent = "0";
    scoreTieEl.textContent = "0";
  }

  updateStatus("Player X, it’s your turn.");
}

function undoMove() {
  if (!moveHistory.length || isLocked) return;
  const lastIndex = moveHistory.pop();
  boardState[lastIndex] = "";
  const cell = boardEl.querySelector(`[data-index="${lastIndex}"]`);
  cell.textContent = "";
  cell.disabled = false;
  cell.classList.remove("x", "o");

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus(`${describePlayer(currentPlayer)}, take the move again.`);
  undoBtn.disabled = moveHistory.length === 0;
}

newMatchBtn.addEventListener("click", () => resetBoard(true));
resetScoreBtn.addEventListener("click", () => resetBoard(false));
undoBtn.addEventListener("click", undoMove);

createBoard();
resetBoard(true);

