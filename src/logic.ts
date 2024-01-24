import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"

type Cell = 'X' | 'O' | null
type MinorBoard = Cell[][]
type MajorBoard = MinorBoard[][]

const winConditions = [
  // Horizontal
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],

  // Vertical
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],

  // Diagonal
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]],
];

export interface GameState {
  majorBoard: MajorBoard;
  
  nextMinorBoard: [number, number] | null;
  lastMovePlayerId: PlayerId | null;
  playerIds: PlayerId[],
}

type GameActions = {
  playMove: (params: { majorRow: number, majorCol: number, minorRow: number, minorCol: number, player: Cell }) => void
  checkWin: (params: { majorRow: number, majorCol: number }) => Cell
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds): GameState => {
    const emptyMinorBoard: MinorBoard = Array(3).fill(null).map(() => Array(3).fill(null));
    const majorBoard: MajorBoard = Array(3).fill(null).map(() => Array(3).fill(emptyMinorBoard));
    return { majorBoard, nextMinorBoard: null, lastMovePlayerId: 'X', playerIds: allPlayerIds};
  },
  actions: {
    playMove: ({ majorRow, majorCol, minorRow, minorCol, player }, { game }) => {
      if (player === game.lastMovePlayerId) {
        console.log(`Player ${player} tried to play out of turn`);
        throw Rune.invalidAction();
      }
      
      
      game.lastMovePlayerId = player;
      game.majorBoard[majorRow][majorCol][minorRow][minorCol] = player;
    },
    checkWin: ({ majorRow, majorCol }, { game }) => {
      
      // Implement your tic-tac-toe win checking logic here.
      // If the minor game at majorBoard[majorRow][majorCol] is won, return 'X' or 'O'.
      // Otherwise, return null.
    },
    
  },
});
