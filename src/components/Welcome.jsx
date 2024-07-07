export default function Welcome(props) {
	return (
		<div>
			<h1>Awesome Trivia</h1>
			<h2>Test your knowledge in different areas!</h2>
			<button onClick={props.startGame}>Start quiz</button>
		</div>
	)
}
