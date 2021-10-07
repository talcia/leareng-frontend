import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import Game from '../../components/Game/Game';

const GamePage = (props) => {
	const history = useHistory();
	const { pathname } = useLocation();

	const endGameHandler = (answers) => {
		props.saveAnswers(answers);
		history.push(`${pathname}/endGame`);
	};

	return <Game {...props} endGameHandler={endGameHandler} />;
};

export default GamePage;
