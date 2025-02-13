export default function Welcome(props) {
	return (
		<div className="top-level-container welcome">
			<h1>Awesome Trivia</h1>
			<h2>Test your knowledge in different areas!</h2>
			<button className="main-button" onClick={() => props.setHasStarted(true)}>Start quiz</button>
		</div>
	)
}
