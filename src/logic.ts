import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
import { Player } from './types/Cell'

type Cell = 'X' | 'O' | null
type MinorBoard = Cell[][]
type MajorBoard = MinorBoard[][]

export interface GameState {
  majorBoard: MajorBoard;
  
  nextMinorBoard: [number, number] | null;
  lastMovePlayerId: PlayerId | null;
  playerIds: PlayerId[],
}

type GameActions = {
  playMove: (params: { majorRow: number, majorCol: number, minorRow: number, minorCol: number, player: Cell }) => void
  checkWinner: (params: { majorRow: number, majorCol: number }) => Player | null
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
    checkWinner: () => {
      
      // Implement your tic-tac-toe win checking logic here.
      // If the minor game at majorBoard[majorRow][majorCol] is won, return 'X' or 'O'.
      // Otherwise, return null.
    },
    
  },
});
