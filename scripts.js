const Gameboard = {
  board: ["", "", "", "", "", "", "", "", ""],
};

const PlayerX = {
  name: "Player X",
  symbol: "X",
};

const PlayerO = {
  name: "Player O",
  symbol: "O",
};

const GameController = {
  turn: PlayerX,
  gameOver: false,
};

function render() {
  document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.innerText = Gameboard.board[index];
  });
}

function addMark(id) {
  const index = parseInt(id.split("-")[1], 10) - 1;
  if (Gameboard.board[index] === "") {
    Gameboard.board[index] = GameController.turn.symbol;
    render();
    switchTurn();
  }
}

document.querySelectorAll(".cell").forEach((cell) => {
  cell.addEventListener("click", function () {
    addMark(this.id);
  });
});

function switchTurn() {
  // eslint-disable-next-line no-use-before-define
  if (checkForWin()) {
    // eslint-disable-next-line no-use-before-define
    showResult(false);
    return;
  }

  // eslint-disable-next-line no-use-before-define
  if (checkForTie()) {
    // eslint-disable-next-line no-use-before-define
    showResult("tie");
    return;
  }

  if (GameController.turn === PlayerX) {
    GameController.turn = PlayerO;
    return;
  }

  GameController.turn = PlayerX;
}

function checkForWin() {
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

  const { board } = Gameboard;
  return winCombinations.some(
    (combination) =>
      board[combination[0]] === board[combination[1]] &&
      board[combination[1]] === board[combination[2]] &&
      board[combination[0]] !== ""
  );
}

function checkForTie() {
  return Gameboard.board.every((cell) => cell !== "");
}

function showResult(result) {
  let message = "";
  if (result === false) {
    message = `${GameController.turn.name} wins!`;
  } else {
    message = `It's a tie!`;
  }

  document.querySelector(".result").innerText = message;
  document.querySelector(".restart-button").style.display = "block";
}

// eslint-disable-next-line no-unused-vars
function computerPlayerTurn() {
  const emptyCells = [];
  Gameboard.board.forEach((cell, index) => {
    if (cell === "") {
      emptyCells.push(index);
    }
  });

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cellIndex = emptyCells[randomIndex];
  Gameboard.board[cellIndex] = PlayerO.symbol;
  render();
  switchTurn();
}
function restartGame() {
  Gameboard.board = ["", "", "", "", "", "", "", "", ""];
  GameController.turn = PlayerX;
  GameController.gameOver = false;
  document.querySelector(".result").innerText = "";
  document.querySelector(".restart-button").style.display = "none";
  render();
}

document
  .querySelector(".restart-button")
  .addEventListener("click", restartGame);
