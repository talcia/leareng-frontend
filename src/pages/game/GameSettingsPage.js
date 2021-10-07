import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import GameSettings from '../../components/Game/GameSettings';
import { sendRequest } from '../../utils/sendRequest';
import ErrorText from '../../components/UI/ErrorText';

const GameSettingsPage = ({ startGameHandler, setError }) => {
	const history = useHistory();
	const userId = useSelector((state) => state.auth.userId);
	const token = useSelector((state) => state.auth.token);
	const { pathname } = useLocation();
	const [unit, setUnit] = useState();
	const [errorGame, setErrorGame] = useState('');

	const unitId = pathname.split('/')[2];

	useEffect(() => {
		const url = `${process.env.REACT_APP_BACKENDURL}/units/${unitId}`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		async function fetchData() {
			try {
				const data = await sendRequest(url, requestObject, {
					401: 'Your email address is not confirm',
					404: "This unit don't exists",
				});
				if (data.unit) {
					if (data.unit.words.length === 0) {
						setError();
					}
					setUnit(data.unit);
				}
			} catch (err) {
				setErrorGame(err);
			}
		}
		fetchData();
	}, [token, unitId, setError]);

	const startGame = (reverse, wordsAmount) => {
		startGameHandler(
			reverse,
			wordsAmount,
			unit.fromLang,
			unit.toLang,
			unit.name
		);
		history.push(`/play/${unitId}/${userId}`);
	};

	return (
		<>
			{errorGame ? (
				<ErrorText text={errorGame} />
			) : (
				<GameSettings unit={unit} startGame={startGame} />
			)}
		</>
	);
};

export default GameSettingsPage;
