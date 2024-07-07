import { useState } from "react"
import Welcome from "./Welcome"
import Game from "./Game"

export default function App() {
	const [hasStarted, setHasStarted] = useState(false)

	function startGame() {
		setHasStarted(true)
	}

	return (
		<div>
			{hasStarted ? <Game /> : <Welcome startGame={startGame}/>}
		</div>
	)
}
