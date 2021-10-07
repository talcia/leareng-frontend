import React, { useEffect, useState } from 'react';
import QuestionWord from '../UI/Game/QuestionWord';
import { randomElementFromArray } from '../../utils/randomElementFromArray';

import classes from './Game.module.css';

const Game = ({
	unitTitle,
	fromLang,
	toLang,
	words,
	reverse,
	endGameHandler,
}) => {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [isEndOfGame, setIsEndOfGame] = useState(false);

	const wordsAmount = words.length;

	useEffect(() => {
		if (isEndOfGame) {
			endGameHandler(answers);
		}
	}, [isEndOfGame, endGameHandler, answers]);

	const nextQuestion = () => {
		if (currentQuestion === wordsAmount - 1) {
			setIsEndOfGame(true);
		} else {
			setCurrentQuestion((state) => state + 1);
		}
	};

	const addAnswer = (translation) => {
		const answer = { ...words[currentQuestion], answer: translation };
		setAnswers((state) => [...state, answer]);
	};

	return (
		<div>
			<div className={classes.title}>
				<h1>{unitTitle}</h1>
				<p>
					translate word from <span>{fromLang.toUpperCase()}</span> to{' '}
					<span>{toLang.toUpperCase()}</span>
				</p>
			</div>
			<div>
				<QuestionWord
					wordsLeft={wordsAmount - currentQuestion - 1}
					nextQuestion={nextQuestion}
					word={
						reverse
							? randomElementFromArray(
									words[currentQuestion].translation
							  )
							: randomElementFromArray(
									words[currentQuestion].word
							  )
					}
					addAnswer={addAnswer}
				/>
			</div>
		</div>
	);
};

export default Game;
