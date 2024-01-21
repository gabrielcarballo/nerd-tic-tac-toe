import { useEffect, useState } from "react"
import reactLogo from "./assets/rune.svg"
import viteLogo from "/vite.svg"
import X from "./assets/x.svg"
import O from "./assets/o.svg"
import "./App.css"
import { GameState } from "./logic.ts"

function App() {
  const [game, setGame] = useState<GameState>()
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game }) => {
        setGame(game)
      },
    })
  }, [])

  if (!game) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="card">
        <button onClick={() => Rune.actions.playMove({ majorRow: 0, majorCol: 1, minorCol: 0, minorRow: 0, player: game.player })}>
          count is {game.majorBoard[0][1]}
          player is {game.player}
        </button>
      </div>
    </>
  )
}

export default App
