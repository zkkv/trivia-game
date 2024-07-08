export default function Answer(props) {
	const isDisabled = !(props.status === "selected" || props.status === "normal")
	return (
		<button
			className={`answer-button ${props.status}`}
			onClick={() => props.updateSelectedAnswer()}
			disabled={isDisabled}
		>
			{props.text}
		</button>
	)
}
