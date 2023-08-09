
class ComputerPlayer {

  static getValidMoves(grid) {
    let validMoves = [];
    // Iterate over board
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        // If space is empty, add to moves
        if (grid[i][j] === ' ') {
          validMoves.push({ row: i, col: j });
        }
      }
    }
    return validMoves;
  }

  // Random choice from all valid moves
  static randomMove(grid) {
    let moves = this.getValidMoves(grid);
    let random = Math.floor(Math.random() * moves.length);
    let move;
    if (!grid[0][1].trim()) {
      move = { row: 0, col: 1};
    } else {
      move = moves[random];
    }
    return move;
  }

  // Get winning moves from rows
  static checkRows(grid, symbol) {
    let moves = [];
    for (let i = 0; i < grid.length; i++) {
      let row = grid[i];
      let count = 0;
      for (let j = 0; j < row.length; j++) {
        if (row[j] === symbol) {
          count++;
          if (count > 1) {
            let winRow = grid[i];
            for (let k = 0; k < winRow.length; k++) {
              if (winRow[k] === ' ') {
                moves.push({ row: i, col: k })
              }
            }
          }
        }
      }
    }

    return moves;
  }

  // Get winning moves from columns
  static checkCols(grid, symbol) {
    let moves = [];
    for (let i = 0; i < 3; i++) {
      let col = [];
      let count = 0;
      for (let j = 0; j < 3; j++) {
        col.push(grid[j][i]);
        if (grid[j][i] === symbol) {
          count++;
        }
      }
      if (count > 1) {
        for (let k = 0; k < 3; k++) {
          if (grid[k][i] === ' ') {
            moves.push({ row: k, col: i });
          }
        }
      }
    }

    return moves;
  }

  // Get winning moves from diagonals
  static checkDiags(grid, symbol) {
    let diags = [];
    let moves = [];
    diags.push([
      { row: 0, col: 0, symbol: grid[0][0] },
      { row: 1, col: 1, symbol: grid[1][1] },
      { row: 2, col: 2, symbol: grid[2][2] }
    ]);
    diags.push([
      { row: 0, col: 2, symbol: grid[0][2] },
      { row: 1, col: 1, symbol: grid[1][1] },
      { row: 2, col: 0, symbol: grid[2][0] }
    ]);
    for (let i = 0; i < 2; i++) {
      let count = 0;
      for (let j = 0; j < 3; j++) {
        if (diags[i][j]['symbol'] === symbol) {
          count++;
        }
      }
      if (count > 1) {
        for (let k = 0; k < 3; k++) {
          let move = diags[i][k];
          if (move['symbol'] === ' ') {
            moves.push({ row: move['row'], col: move['col'] });
          }
        }
      }
    }

    return moves;
  }

  static getWinningMoves(grid, symbol) {
    let rowWins = this.checkRows(grid, symbol);
    let colWins = this.checkCols(grid, symbol);
    let diagWins = this.checkDiags(grid, symbol);

    if (rowWins.length > 0) {
      return rowWins[0];
    } else if (colWins.length > 0) {
      return colWins[0];
    } else if (diagWins.length > 0) {
      return diagWins[0];
    }
  }

  static getScore(move) {
    if (move.row === 1 && move.col === 1) {
      return 3;
    } else if (move.row === 0 && move.col === 0) {
      return 2;
    } else if (move.row === 0 && move.col === 2) {
      return 2;
    } else if (move.row === 2 && move.col === 0) {
      return 2;
    } else if (move.row === 2 && move.col === 2) {
      return 2;
    } else if (move.row === 0) {
      return 1;
    } else if (move.col === 0) {
      return 1;
    } else if (move.row === 2) {
      return 1;
    } else if (move.col === 2) {
      return 1;
    }
  }

  static getBestMove(grid) {
    let moves = this.getValidMoves(grid);
    let bestMove = moves[0];
    let bestScore = -1000;

    for (let i = 0; i < moves.length; i++) {
      let move = moves[i];
      let moveScore = this.getScore(move);

      if (moveScore > bestScore) {
        bestMove = move;
        bestScore = moveScore;
      }
    }

    return bestMove;
  }

  static getSmartMove(grid, symbol) {
    let computer = this.getWinningMoves(grid, symbol);
    let player = this.getWinningMoves(grid, 'O');
    let bestMove = this.getBestMove(grid);
    let random = this.randomMove(grid, symbol);

    if (computer) {
      return computer;
    } else if (player) {
      return player;
    } else if (bestMove) {
      return bestMove;
    } else {
      return random;
  }
    }
}

module.exports = ComputerPlayer;
