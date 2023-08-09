const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./computer-player");

class TTT {

    constructor() {

        this.playerTurn = "O";

        this.grid = [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ]

        this.cursor = new Cursor(3, 3);

        Screen.initialize(3, 3);
        Screen.setGridlines(true);

        Screen.addCommand('up', 'up command', this.cursor.up.bind(this.cursor));
        Screen.addCommand('down', 'down command', this.cursor.down.bind(this.cursor));
        Screen.addCommand('left', 'left command', this.cursor.left.bind(this.cursor));
        Screen.addCommand('right', 'right command', this.cursor.right.bind(this.cursor));
        Screen.addCommand('return', 'make mark command', this.makeMark.bind(this));

        Screen.render();
    }

    makeMark() {
        let player = this.playerTurn;
        let current = this.grid[this.cursor.row][this.cursor.col];

        if (current === ' ') {
            this.grid[this.cursor.row][this.cursor.col] = player;
            Screen.setGrid(this.cursor.row, this.cursor.col, player)

        if (TTT.checkWin(this.grid)) TTT.endGame(player);

        if (player === 'O') this.playerTurn = 'X';
        else if (player === 'X') this.playerTurn = 'O';
        this.computerMakeMark();
        Screen.render();
    }
    }

    computerMakeMark() {
      let player = this.playerTurn;
      setTimeout(() => {
        let move = ComputerPlayer.getSmartMove(this.grid, player);
        console.log(move)
        this.cursor.computerMark(move);
        Screen.setGrid(this.cursor.row, this.cursor.col, player);
        Screen.render();
        if (player === 'O') this.playerTurn = 'X';
        else if (player === 'X') this.playerTurn = 'O';
      }, 1000);
    }

    static checkWin(grid) {
        let winner = false;
        let empties = [];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === ' ') empties.push(grid[i][j]);
            }
        }

        // Horizontal
        if (grid[0][0] !== ' ' && grid[0][0] === grid[0][1] && grid[0][1] === grid[0][2]) winner = grid[0][0];
        if (grid[1][0] !== ' ' && grid[1][0] === grid[1][1] && grid[1][1] === grid[1][2]) winner = grid[1][0];
        if (grid[2][0] !== ' ' && grid[2][0] === grid[2][1] && grid[2][1] === grid[2][2]) winner = grid[2][0];
        // Vertical
        if (grid[0][0] !== ' ' && grid[0][0] === grid[1][0] && grid[1][0] === grid[2][0]) winner = grid[0][0];
        if (grid[0][1] !== ' ' && grid[0][1] === grid[1][1] && grid[1][1] === grid[2][1]) winner = grid[0][1];
        if (grid[0][2] !== ' ' && grid[0][2] === grid[1][2] && grid[1][2] === grid[2][2]) winner = grid[0][2];
        // Diagonal
        if (grid[0][0] !== ' ' && grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) winner = grid[0][0];
        if (grid[2][0] !== ' ' && grid[2][0] === grid[1][1] && grid[1][1] === grid[0][2]) winner = grid[2][0];
        // Tie
        if (empties.length === 0) winner = 'T';

        return winner;
    }

    static endGame(winner) {
        if (winner === 'O' || winner === 'X') {
            Screen.setMessage(`Player ${winner} wins!`);
        } else if (winner === 'T') {
            Screen.setMessage(`Tie game!`);
        } else {
            Screen.setMessage(`Game Over`);
        }
        Screen.render();
        Screen.quit();
    }

}

module.exports = TTT;
