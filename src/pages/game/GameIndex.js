import React, { useState } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GameSettingsPage from './GameSettingsPage';
import GamePage from './GamePage';
import { sendRequest } from '../../utils/sendRequest';
import EndOfGamePage from './EndOfGamePage';
import ErrorText from '../../components/UI/ErrorText';

const GameIndex = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const token = useSelector((state) => state.auth.token);
	const { pathname } = useLocation();

	const [fromLang, setFromLang] = useState();
	const [toLang, setToLang] = useState();
	const [reverse, setReverse] = useState();
	const [words, setWords] = useState();
	const [unitTitle, setUnitTitle] = useState();

	const [answers, setAnswers] = useState([]);
	const [errorGame, setErrorGame] = useState('');

	const splitLocation = pathname.split('/');
	const unitId = splitLocation[2];

	const setError = () => {
		setErrorGame("This unit don't have words");
	};

	const getRandomWords = async (numberOfWords) => {
		const url = `${process.env.REACT_APP_BACKENDURL}/units/play/${unitId}/${numberOfWords}/:${reverse}`;

		const requestObject = {
			method: 'GET',
			token: token,
		};

		try {
			const data = await sendRequest(url, requestObject, {
				401: 'Your email address is not confirm',
			});

			if (data.words.length !== 0) {
				setWords(data.words);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const startGameHandler = (
		reverse,
		wordsAmount,
		fromLang,
		toLang,
		unitTitle
	) => {
		if (reverse) {
			setFromLang(toLang);
			setToLang(fromLang);
		} else {
			setFromLang(fromLang);
			setToLang(toLang);
		}
		setUnitTitle(unitTitle);
		setReverse(reverse);
		getRandomWords(wordsAmount);
	};

	const saveAnswers = (answers) => {
		setAnswers(answers);
	};

	return (
		<Switch>
			{errorGame ? (
				<ErrorText text={errorGame} />
			) : (
				isAuth && (
					<>
						<Route path="/play/:unitId" exact>
							<GameSettingsPage
								startGameHandler={startGameHandler}
								setError={setError}
							/>
						</Route>
						<Route path="/play/:unitId/:userId" exact>
							{words && (
								<GamePage
									fromLang={fromLang}
									toLang={toLang}
									words={words}
									unitTitle={unitTitle}
									reverse={reverse}
									saveAnswers={saveAnswers}
								/>
							)}
						</Route>
						<Route path="/play/:unitId/:userId/endGame">
							<EndOfGamePage
								answers={answers}
								words={words}
								fromLang={fromLang}
								toLang={toLang}
								unitTitle={unitTitle}
								reverse={reverse}
							/>
						</Route>
					</>
				)
			)}
		</Switch>
	);
};

export default GameIndex;
