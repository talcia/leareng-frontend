import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './PasswordSettings.module.css';

import { sendRequest } from '../../utils/sendRequest';

const PasswordSettings = () => {
	const token = useSelector((state) => state.auth.token);
	const email = useSelector((state) => state.auth.email);
	const [message, setMessage] = useState('');

	const sendResetPasswordLink = async () => {
		const url = `${process.env.REACT_APP_BACKENDURL}/auth/resetPassword`;
		const requestObject = {
			method: 'POST',
			token: token,
			data: {
				email,
			},
		};
		try {
			const data = await sendRequest(url, requestObject);
			console.log(data.message);
			setMessage(data.message);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className={classes.passwordReset}>
			<h2>Password settings</h2>
			{message ? (
				<p>{message}</p>
			) : (
				<p>
					If you want to reset your password click{' '}
					<span onClick={sendResetPasswordLink}>this link</span> and
					we will send you a link on your email
				</p>
			)}
		</div>
	);
};

export default PasswordSettings;
