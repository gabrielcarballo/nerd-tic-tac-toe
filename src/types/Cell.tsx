export type BoardIndex = 0 | 1 | 2;
export type Player = 0 | 1;
export type CellIndices = {
  majorRow: BoardIndex,
  majorCol: BoardIndex,
  minorRow: BoardIndex,
  minorCol: BoardIndex
};