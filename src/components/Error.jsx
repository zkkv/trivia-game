export default function Error(props) {
	return (
		<div className="top-level-container">
			<h1>Sorry, a network error occurred</h1>
			<button className="main-button" onClick={props.handleClick}>Try again</button>
		</div>
	)
}