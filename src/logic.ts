import type { RuneClient } from "rune-games-sdk/multiplayer"

type Cell = 'X' | 'O' | null
type Player = 'X' | 'O'
type MinorBoard = Cell[][]
type MajorBoard = MinorBoard[][]

export interface GameState {
  majorBoard: MajorBoard;
  player: Player;
}

type GameActions = {
  playMove: (params: { majorRow: number, majorCol: number, minorRow: number, minorCol: number, player: Cell }) => void
  checkWin: (params: { majorRow: number, majorCol: number }) => Cell
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

const togglePlayer = (player: Player) => {
  return player = player === 'X' ? 'O' : 'X';
};


Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (): GameState => {
    const emptyMinorBoard: MinorBoard = Array(3).fill(null).map(() => Array(3).fill(null));
    const majorBoard: MajorBoard = Array(3).fill(null).map(() => Array(3).fill(emptyMinorBoard));
    return { majorBoard, player: 'X' };
  },
  actions: {
    playMove: ({ majorRow, majorCol, minorRow, minorCol, player }, { game }) => {
      game.majorBoard[majorRow][majorCol][minorRow][minorCol] = player;
      game.player = togglePlayer(game.player);
    },
    checkWin: ({ majorRow, majorCol }, { game }) => {
      console.log('checkWin', majorRow, majorCol);
      console.log(game);
      // Implement your tic-tac-toe win checking logic here.
      // If the minor game at majorBoard[majorRow][majorCol] is won, return 'X' or 'O'.
      // Otherwise, return null.
    },
  },
})
