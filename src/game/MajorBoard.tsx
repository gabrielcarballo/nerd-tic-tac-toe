import { Board } from './Board';

export class MajorBoard {
  majorBoard: Board[][];

  constructor() {
    this.majorBoard = [
      [new Board(), new Board(), new Board()],
      [new Board(), new Board(), new Board()],
      [new Board(), new Board(), new Board()],
    ];
  }
}