import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
import { CellIndices } from './types/Cell';
import { MajorBoard } from './game/MajorBoard'
import { NextBoard } from "./types/NextBoard";



export interface GameState {
  majorBoardState: MajorBoard;
  nextMinorBoard: NextBoard | null;
  lastMovePlayerId: PlayerId | null;
  playerIds: PlayerId[],
}

type GameActions = {
  claimCell: (params: CellIndices) => void
}

declare global {
  const Rune: RuneClient<GameState, GameActions>
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds): GameState => {
    const majorBoardState = new MajorBoard();
    return { majorBoardState, nextMinorBoard: null, lastMovePlayerId: 'X', playerIds: allPlayerIds };
  },
  actions: {
    claimCell: ({ majorRow, majorCol, minorRow, minorCol }, { game }) => {
      const board = game.majorBoardState.majorBoard[majorRow][majorCol];
    if (game.nextMinorBoard && game.nextMinorBoard.row !== null && game.nextMinorBoard.column !== null) {
      const nextBoard = game.majorBoardState.majorBoard[game.nextMinorBoard.row][game.nextMinorBoard.column];
      if (!nextBoard.isDraw() && (majorRow !== game.nextMinorBoard.row || majorCol !== game.nextMinorBoard.column)) {
        throw Rune.invalidAction();
      }
    }
      board.playMove(minorRow, minorCol);
      game.nextMinorBoard = board.nextBoard;
    },

  },
});
