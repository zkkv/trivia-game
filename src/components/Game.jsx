import { useState, useEffect } from "react"
import endpoint from "/endpoint"

export default function Game() {
	const [questions, setQuestions] = useState({})

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
				correctAnswerIndex: randomIndex
			}
		})
	}

	useEffect(() => {
		async function getQuestions() {
			const res = await fetch(endpoint)
			const data = await res.json()
			if (data.response_code === 0) {
				setQuestions(parseData(data))
			} else {
				console.error("API Error")
			}

		}
		getQuestions()
	}, [])

	return (
		<div>
			{JSON.stringify(questions)}
		</div>
	)
}
