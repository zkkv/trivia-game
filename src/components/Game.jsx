import { useState, useEffect } from "react"
import Question from "./Question"
import endpoint from "/endpoint"

export default function Game() {
	const [questions, setQuestions] = useState([])

	function parseData(data) {
		return data.results.map(q => {
			const numAnswers = q.incorrect_answers.length + 1
			const randomIndex = Math.floor(Math.random() * numAnswers)
			const answers = [...q.incorrect_answers]
			answers.splice(randomIndex, 0, q.correct_answer)
			return {
				category: q.category,
				question: q.question,
				answers: answers,
				correctAnswerIndex: randomIndex,
				selectedAnswer: null
			}
		})
	}

	function updateSelectedAnswer(questionIndex, answerIndex) {
		const prevQuestions = [...questions]
		prevQuestions[questionIndex].selectedAnswer = answerIndex
		setQuestions(prevQuestions)
	}

	useEffect(() => {
		async function getQuestions() {
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

		}
		getQuestions()
	}, [])

	const questionComponents = questions.map((item, index) =>
		<Question
			key={index}
			question={item.question}
			category={item.category}
			answers={item.answers}
			updateSelectedAnswer={answerIndex => updateSelectedAnswer(index, answerIndex)}
		/>
	)

	return (
		<div>
			{questionComponents}
		</div>
	)
}
