export default function Question(props) {
	const buttons = props.answers.map((item, index) =>
		<button key={index} onClick={() => props.updateSelectedAnswer(index)}>
			{item}
		</button>
	)

	return (
		<div>
			<h2>{props.question}</h2>
			<h3>{props.category}</h3>
			{buttons}
		</div>
	)
}
