import React from 'react';
import useInput from '../../hooks/use-input';
import { useState } from 'react';

import Input from '../UI/Input';
import ErrorText from '../UI/ErrorText';

import classes from './ForgotPasswordForm.module.css';

const ForgotPasswordForm = ({ setIsEmailWasSent }) => {
	const [formError, setFormError] = useState(null);

	const {
		value: enteredEmail,
		isValid: emailIsValid,
		hasError: emailHasError,
		reset: emailReset,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput((value) => value.includes('@'));

	const submitHandler = async (e) => {
		e.preventDefault();
		emailBlurHandler();

		if (!emailIsValid) {
			return;
		}

		const userData = { email: enteredEmail };

		try {
			await fetch('http://localhost:8080/auth/resetPassword', {
				method: 'POST',
				body: JSON.stringify(userData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			setIsEmailWasSent(true);
		} catch (err) {
			console.log(err.status);
			setFormError(err.message);
		}
		emailReset();
	};

	return (
		<section className={classes.forgotPwd} onSubmit={submitHandler}>
			<h1>Reset password</h1>
			<p>
				Enter the email associated with your account and we'll{' '}
				<span>send an email with instruction</span> to reset your
				password
			</p>
			{formError && <ErrorText text={formError} />}

			<form>
				<Input
					type="email"
					id="email"
					placeholder="Email"
					value={enteredEmail}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
					hasError={emailHasError}
					errorText={'Email must be valid'}
				/>
				<button type="submit">Send email</button>
			</form>
		</section>
	);
};

export default ForgotPasswordForm;
