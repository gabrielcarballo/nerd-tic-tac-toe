import { BoardIndex } from './Cell';

export type NextBoard = {
  row: BoardIndex | null;
  column: BoardIndex | null;
}