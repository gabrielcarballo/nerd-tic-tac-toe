import { BoardIndex, Player } from '../types/Cell';
import { TicTacToe } from './TicTacToe';
import { NextBoard } from '../types/NextBoard';


export class Board extends TicTacToe {
  board: (Player | null)[][] = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  nextBoard: NextBoard = {
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

  public playMove(row: BoardIndex, column: BoardIndex): Player | void {
    this.claimCell(row, column);
    if (this.checkWinner()) {
      return this.currentPlayer;
    }
    this.switchPlayer();
  }

  protected checkWinner(): Player | null {
    for (let i = 0; i < 3; i++) {
      const rowWin = this.board[i][0] !== null && this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2];
      const columnWin = this.board[0][i] !== null && this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i];
  
      if (rowWin || columnWin) {
        return this.currentPlayer;
      }
    }
  
    const diagonalWin1 = this.board[0][0] !== null && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2];
    const diagonalWin2 = this.board[0][2] !== null && this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0];
  
    if (diagonalWin1 || diagonalWin2) {
      return this.currentPlayer;
    }
  
    return null;
  }

  protected claimCell(row: BoardIndex, column: BoardIndex): void | Error {
    if (this.board[row][column] !== null) {
      throw Rune.invalidAction();
    }
    this.board[row][column] = this.currentPlayer;
    this.nextBoard = {
      row,
      column,
    };
  }
}