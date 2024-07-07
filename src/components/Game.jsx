import { useState, useEffect, useCallback } from "react"
import he from "he"
import Question from "./Question"
import endpoint from "/endpoint"

export default function Game() {
	const [questions, setQuestions] = useState([])
	const [gameState, setGameState] = useState("playing")

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

	const getQuestions = useCallback(async() => {
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

	useEffect(() => {
		getQuestions()
	}, [getQuestions])

	function updateSelectedAnswer(questionIndex, answerIndex) {
		const prevQuestions = [...questions]
		prevQuestions[questionIndex].selectedAnswerIndex = answerIndex
		setQuestions(prevQuestions)
	}

	function checkAnswers() {
		if (questions.every(q => q.selectedAnswerIndex === q.correctAnswerIndex)) {
			setGameState("win")
		} else {
			setGameState("loss")
		}
	}

	const questionComponents = questions.map((item, index) =>
		<Question
			key={index}
			question={item.question}
			category={item.category}
			answers={item.answers}
			updateSelectedAnswer={answerIndex => updateSelectedAnswer(index, answerIndex)}
		/>
	)

	const areAllAnswered = questions.every(q => q.selectedAnswerIndex !== null)

	return (
		<div>
			{questionComponents}
			<button onClick={checkAnswers} disabled={!areAllAnswered}>Check answers</button>
			{gameState === "win" && <p>You won</p>}
			{gameState === "loss" && <p>You lost</p>}
			{gameState !== "playing" && <button onClick={getQuestions}>Play again</button>}
		</div>
	)
}
