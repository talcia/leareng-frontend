import React, { useCallback, useEffect, useState } from 'react';
import EndOfGame from '../../components/Game/EndOfGame';

const EndOfGamePage = ({ answers, reverse, ...props }) => {
	const [points, setPoints] = useState(0);
	const [goodAnswers, setGoodAnswers] = useState([]);

	const countGoodAnswers = useCallback(() => {
		const ratedAnswers = answers.map((item) => {
			let correct = false;
			let correctAnswers = reverse ? item.word : item.translation;
			if (correctAnswers.includes(item.answer.toLowerCase())) {
				correct = true;
			}
			return { ...item, correct };
		});

		const numberOfGoodAnswers = ratedAnswers.filter(
			(item) => item.correct
		).length;

		setGoodAnswers(ratedAnswers);
		setPoints(numberOfGoodAnswers);
	}, [answers, reverse]);

	useEffect(() => {
		countGoodAnswers();
	}, [countGoodAnswers]);

	return (
		<EndOfGame
			{...props}
			ratedAnswers={goodAnswers}
			points={points}
			reverse={reverse}
		/>
	);
};

export default EndOfGamePage;
