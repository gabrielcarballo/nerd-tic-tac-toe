import { Board } from './Board';

export class MajorBoard extends Board {
  majorBoard: Board[][];
  constructor() {
    super();
    
    this.majorBoard = [
      [new Board(), new Board(), new Board()],
      [new Board(), new Board(), new Board()],
      [new Board(), new Board(), new Board()],
    ];
  }
}