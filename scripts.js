function Gameboard() {
  this.board = ["", "", "", "", "", "", "", "", ""];
}

function gamePlayers() {
  const playerOne = {
    name: "Player 1",
    symbol: "X",
    color: "green",
    makeMove(index, board) {
      const newBoard = board.slice();
      if (newBoard[index === ""]) {
        newBoard[index] = this.symbol;
        return newBoard;
      }
      return false;
    },
  };

  const playerTwo = {
    name: "Player 2",
    symbol: "O",
    color: "yellow",
    makeMove(index, board) {
      const newBoard = board.slice();
      if (newBoard[index === ""]) {
        newBoard[index] = this.symbol;
        return newBoard;
      }
      return false;
    },
  };
  return { playerOne, playerTwo };
}

function gameController() {
  const { playerOne, playerTwo } = gamePlayers();
  let currentPlayer = playerOne;

  function switchTurns() {
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  }
}
