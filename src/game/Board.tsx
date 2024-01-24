import { BoardIndex, Player } from '../types/Cell';
import { TicTacToe } from './TicTacToe';
import { NextBoard } from '../types/NextBoard';


export class Board extends TicTacToe {
  board: (Player | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  nextBoard: NextBoard= {
    row: null,
    column: null,
  };
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

  protected switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
  }

  public playMove(row: BoardIndex, column: BoardIndex) {
    if (this.board[row][column] !== null) {
      throw Rune.invalidAction();
    }
    this.nextBoard = {
      row,
      column,
    }
    this.board[row][column] = this.currentPlayer;
    if (Rune.actions.checkWinner()) {
      return this.currentPlayer;
    }
    
    this.switchPlayer();
  }

  protected checkWinner(): Player | null {
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