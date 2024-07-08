import { useState, useEffect, useCallback, useRef } from "react"
import Confetti from "react-confetti"
import he from "he"
import Question from "./Question"
import endpoint from "/endpoint"

export default function Game() {
	const [questions, setQuestions] = useState([])
	const [isPlaying, setIsPlaying] = useState(true)

	function parseData(data) {
		return data.results.map(q => {
			const numAnswers = q.incorrect_answers.length + 1
			const randomIndex = Math.floor(Math.random() * numAnswers)
			const answers = [...q.incorrect_answers]
			answers.splice(randomIndex, 0, q.correct_answer)
			return {
				category: he.decode(q.category),
				question: he.decode(q.question),
				answers: answers.map(text => he.decode(text)),
				correctAnswerIndex: randomIndex,
				selectedAnswerIndex: null
			}
		})
	}

	const fetchQuestions = useCallback(async () => {
		const res = await fetch(endpoint)

		if (!res.ok) {
			console.error(`Response code: ${res.status}`)
			return;
		}

		const data = await res.json()

		if (data.response_code === 0) {
			setQuestions(parseData(data))
		} else {
			console.error("Non-zero response-object code")
		}
	}, [])

	const startGame = useCallback(() => {
		fetchQuestions()
		setIsPlaying(true)
	}, [fetchQuestions])

	useEffect(() => {
		startGame()
	}, [startGame])

	function updateSelectedAnswer(questionIndex, answerIndex) {
		const prevQuestions = [...questions]
		prevQuestions[questionIndex].selectedAnswerIndex = answerIndex
		setQuestions(prevQuestions)
	}

	const questionComponents = questions.map((item, index) =>
		<>
			<Question
				key={index}
				{...item}
				updateSelectedAnswer={answerIndex => updateSelectedAnswer(index, answerIndex)}
				isPlaying={isPlaying}
			/>
			<hr className="divider"></hr>
		</>
	)

	const areAllAnswered = questions.every(q => q.selectedAnswerIndex !== null)
	const nCorrect = questions.filter(q => q.selectedAnswerIndex === q.correctAnswerIndex).length
	const hasWon = nCorrect === questions.length && nCorrect > 0
	const containerRef = useRef(null)

	return (
		<div ref={containerRef} className="top-level-container">
			<h1>Here&apos;s {questions.length} questions for ya!</h1>
			<div className="questions-container">
				{questionComponents}
			</div>
			{isPlaying
				? <div className="bottom-controls">
					<button
						className="main-button"
						onClick={() => setIsPlaying(false)}
						disabled={!areAllAnswered}>Check answers
					</button>
				</div>
				: <div className="bottom-controls">
					<p className="results">You scored {nCorrect}/{questions.length} correct answers</p>
					<button className="main-button" onClick={startGame}>Play again</button>
				</div>}
			{hasWon &&
				<Confetti
					recycle={false}
					width={containerRef.current.clientWidth}
					height={containerRef.current.clientHeight}
					gravity={0.3}
				/>}
		</div>
	)
}
