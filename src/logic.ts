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
      if (game.nextMinorBoard && (majorRow !== game.nextMinorBoard.row || majorCol !== game.nextMinorBoard.column)) {
        throw Rune.invalidAction();
      }
      game.majorBoardState.majorBoard[majorRow][majorCol].playMove(minorRow, minorCol);
      game.nextMinorBoard = game.majorBoardState.majorBoard[majorRow][majorCol].nextBoard;
    },
  },
});
