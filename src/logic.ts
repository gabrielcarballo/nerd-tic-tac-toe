import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
import { Player } from './types/Cell'
import { MajorBoard } from './game/MajorBoard'



export interface GameState {
  majorBoard: MajorBoard;
  nextMinorBoard: [number, number] | null;
  lastMovePlayerId: PlayerId | null;
  playerIds: PlayerId[],
}

type GameActions = {
  playMove: (params: { majorRow: number, majorCol: number, minorRow: number, minorCol: number }) => void
  checkWinner: () => Player | null
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds): GameState => {
    const majorBoard = new MajorBoard();
    return { majorBoard, nextMinorBoard: null, lastMovePlayerId: 'X', playerIds: allPlayerIds };
  },
  actions: {
    playMove: ({ majorRow, majorCol, minorRow, minorCol }, { game }) => {
      game.majorBoard.majorBoard
    },
    checkWinner: () => {

      // Implement your tic-tac-toe win checking logic here.
      // If the minor game at majorBoard[majorRow][majorCol] is won, return 'X' or 'O'.
      // Otherwise, return null.
    },

  },
});
