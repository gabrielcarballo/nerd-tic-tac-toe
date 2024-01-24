import type { RuneClient, PlayerId } from "rune-games-sdk/multiplayer"
import { CellIndices } from './types/Cell';
import { MajorBoard } from './game/MajorBoard'
import { NextBoard } from "./types/NextBoard";



export interface GameState {
  majorBoard: MajorBoard;
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
    const majorBoard = new MajorBoard();
    return { majorBoard, nextMinorBoard: null, lastMovePlayerId: 'X', playerIds: allPlayerIds };
  },
  actions: {
    claimCell: ({ majorRow, majorCol, minorRow, minorCol }, { game }) => {
      game.majorBoard.majorBoard[majorRow][majorCol].playMove(minorRow, minorCol);
      game.nextMinorBoard = game.majorBoard.nextBoard;
    },
  },
});
