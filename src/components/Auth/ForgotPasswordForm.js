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
	} = useInput((value) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(value).toLowerCase());
	});

	const submitHandler = async (e) => {
		e.preventDefault();
		emailBlurHandler();

		if (!emailIsValid) {
			return;
		}

		const userData = { email: enteredEmail };

		try {
			const response = await fetch(
				`https://leareng.herokuapp.com/auth/resetPassword`,
				{
					method: 'POST',
					body: JSON.stringify(userData),
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const data = await response.json();
			console.log(data);
			if (data.status === 404) {
				throw data.message;
			}
			if (response.status !== 200) {
				throw new Error('Something went wrong');
			}
			setIsEmailWasSent(true);
			emailReset();
		} catch (err) {
			setFormError(err);
		}
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
