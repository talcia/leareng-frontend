import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import Button from '../UI/Button';

import classes from './EndOfGame.module.css';
import { useHistory, useLocation } from 'react-router';
import AnswersTable from './AnswersTable';

const EndOfGame = ({
	unitTitle,
	fromLang,
	toLang,
	ratedAnswers,
	points,
	reverse,
}) => {
	const history = useHistory();
	const { pathname } = useLocation();

	const splitLocation = pathname.split('/');
	const unitId = splitLocation[2];

	const playAgainHandler = () => {
		history.push(`/play/${unitId}`);
	};

	const backToUnitHandler = () => {
		history.push(`/units/${unitId}`);
	};

	const result = Math.round((points / ratedAnswers.length) * 10000) / 100;

	const endText = () => {
		if (result <= 25) {
			return "It's not good result. Please try again";
		} else if (result <= 50) {
			return "It's not bad but always can be better";
		} else if (result <= 75) {
			return 'Nice result, keep learning!';
		} else {
			return "Congrats, you're the master of this unit!";
		}
	};

	return (
		<div className={classes.container}>
			<div className={classes.title}>
				<h1>{unitTitle}</h1>
				<p>
					<span>{fromLang.toUpperCase()}</span>
					<FontAwesomeIcon icon={faLongArrowAltRight} />
					<span>{toLang.toUpperCase()}</span>
				</p>
				<p>{}</p>
			</div>
			<div className={classes.statistic}>
				<span>{result}%</span>
				<p className={classes.endText}>{endText()}</p>
			</div>
			<AnswersTable ratedAnswers={ratedAnswers} reverse={reverse} />
			<div className={classes.actions}>
				<Button text="Play again" onClick={playAgainHandler} />
				<Button
					text="Back to unit"
					onClick={backToUnitHandler}
					cancel={true}
				/>
			</div>
		</div>
	);
};

export default EndOfGame;
