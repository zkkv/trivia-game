import Answer from "./Answer"

export default function Question(props) {
	const buttons = props.answers.map((item, index) => {
		let status
		if (props.isPlaying) {
			if (index === props.selectedAnswerIndex) {
				status = "selected"
			} else {
				status = "normal"
			}
		} else {
			if (index === props.correctAnswerIndex) {
				status = "correct"
			} else if (index === props.selectedAnswerIndex) {
				status = "incorrect"
			} else {
				status = "other"
			}
		}

		return <Answer
			key={index}
			status={status}
			text={item}
			updateSelectedAnswer={() => props.updateSelectedAnswer(index)}
		/>
	}
	)

	return (
		<div className="question">
			<h2>{props.question}</h2>
			<h3>{props.category}</h3>
			<div className="button-container">{buttons}</div>
		</div>
	)
}
