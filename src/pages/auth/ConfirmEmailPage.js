import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { sendRequest } from '../../utils/sendRequest';

import { authActions } from '../../store/auth-slice';
import ConfirmMessage from '../../components/Auth/ConfirmMessage';

import jwt from 'jwt-decode';

const ConfirmEmailPage = () => {
	const { token } = useParams();
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	useEffect(() => {
		async function sendData() {
			const url = `${process.env.REACT_APP_BACKENDURL}/auth/confirmEmail/${token}`;
			const requestObject = {
				method: 'GET',
			};
			const errorMessage = {
				400: 'Sorry but your link is invalid',
				404: 'Sorry but your link expired',
			};
			try {
				const data = await sendRequest(
					url,
					requestObject,
					errorMessage
				);
				const user = jwt(data.token);
				dispatch(authActions.login({ token: data.token, user }));
			} catch (err) {
				setError({
					title: err.message,
					message: 'You can ask to send confirm email again',
				});
			}
		}
		sendData();
	}, [token, dispatch]);

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
