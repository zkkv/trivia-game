import { useState } from "react"
import Welcome from "./Welcome"
import Game from "./Game"

export default function App() {
	const [hasStarted, setHasStarted] = useState(false)

	return (
		<div>
			{hasStarted ? <Game /> : <Welcome setHasStarted={setHasStarted} />}
		</div>
	)
}
