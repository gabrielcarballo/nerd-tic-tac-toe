import { BoardIndex, Player } from '../types/Cell';
import { TicTacToe } from './TicTacToe';


export abstract class Board extends TicTacToe {
  board: (Player | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  player1: Player = 0;
  player2: Player = 1;
  public currentPlayer = this.player1;

  public resetBoard() {
    this.board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
  }

   switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  public playMove(row: BoardIndex, column: BoardIndex) {
    if (this.board[row][column] !== null) {
      throw Rune.invalidAction();
    }

    this.board[row][column] = this.currentPlayer;
    this.checkWinner();
    this.switchPlayer();
  }

  public checkWinner(): Player | null {
    // check rows
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2]) {
        return this.currentPlayer;
      }
    }

    // check columns
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i]) {
        return this.currentPlayer;
      }
    }

    // check diagonals
    if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return this.currentPlayer;
    }
    if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
      return this.currentPlayer;
    }

    return null;
  }
}