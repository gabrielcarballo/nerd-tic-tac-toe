import { BoardIndex, Player } from '../types/Cell';

export abstract class TicTacToe {
  abstract board: (Player | null)[][];
  abstract player1: Player;
  abstract player2: Player;
  abstract currentPlayer: Player;

  abstract resetBoard(): void;
  abstract switchPlayer(): void;
  abstract playMove(row: BoardIndex, column: BoardIndex): void;
  abstract checkWinner(): Player | null;
}