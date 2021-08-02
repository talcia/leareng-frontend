import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth-slice';
import ConfirmMessage from '../../components/Auth/ConfirmMessage';

import jwt from 'jwt-decode';

const ConfirmEmailPage = () => {
	const { token } = useParams();
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const sendRequest = useCallback(async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_FRONTENDURL}/auth/confirmEmail/${token}`
			);
			const data = await response.json();
			if (data.status === 400) {
				throw new Error('Sorry but your link is invalid');
			} else if (data.status === 404) {
				throw new Error('Sorry but your link expired');
			}
			const user = jwt(data.token);
			dispatch(authActions.login({ token: data.token, user }));
		} catch (err) {
			setError({
				title: err.message,
				message: 'You can ask to send confirm email again',
			});
		}
	}, [token, dispatch]);

	useEffect(() => {
		sendRequest();
	}, [sendRequest]);

	return (
		<ConfirmMessage
			title={error ? error.title : 'Your email has been confirmed'}
			message={error ? error.message : 'Now you can use more of this app'}
			isButtonVisible={error}
			buttonLink={'/auth/send-confirm-email'}
			buttonText={'Send link again'}
		/>
	);
};

export default ConfirmEmailPage;
