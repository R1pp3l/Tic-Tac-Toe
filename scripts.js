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

  function checkWinner(board) {
    for (let i = 0; i < 3; i += 3) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 1] &&
        board[i + 1] === board[i + 2]
      ) {
        return board[i];
      }
    }

    for (let i = 0; i < 3; i += 1) {
      if (
        board[i] !== "" &&
        board[i] === board[i + 3] &&
        board[i + 3] === board[i + 6]
      ) {
        return board[i];
      }
    }

    if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
      return board[0];
    }

    if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
      return board[2];
    }

    if (!board.included("")) {
      return "tie";
    }
    return null;
  }
  return {
    makeMove(index, board) {
      if (currentPlayer.makeMove(index, board)) {
        const winner = checkWinner(board);
        if (winner !== null) {
          return winner;
        }
        switchTurns();
        return "continue";
      }
      return "invalid";
    },
  };
}
