import { BoardIndex, Player } from '../types/Cell';
import { NextBoard } from '../types/NextBoard';

export abstract class TicTacToe {
  abstract board: (Player | null)[][];
  abstract player1: Player;
  abstract player2: Player;
  abstract currentPlayer: Player;
  abstract nextBoard: NextBoard;

  abstract resetBoard(): void;
  protected abstract switchPlayer(): void;
  abstract playMove(row: BoardIndex, column: BoardIndex): void;
  protected abstract checkWinner(): Player | null;
  protected abstract claimCell(row: BoardIndex, column: BoardIndex): void;
}