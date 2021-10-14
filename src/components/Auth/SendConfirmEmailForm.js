import React from 'react';
import useInput from '../../hooks/use-input';
import { useState } from 'react';

import Input from '../UI/Input';
import ErrorText from '../UI/ErrorText';
import Button from '../UI/Button';

import classes from './ForgotPasswordForm.module.css';
import { sendRequest } from '../../utils/sendRequest';

const SendConfirmEmailForm = ({ setIsEmailWasSent }) => {
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

		const url = `${process.env.REACT_APP_BACKENDURL}/auth/sendConfirmEmailAgain`;
		const requestObject = {
			method: 'POST',
			data: userData,
		};
		const errorMessage = {
			404: 'No user found with that email address',
		};

		try {
			await sendRequest(url, requestObject, errorMessage);
			setIsEmailWasSent(true);
			emailReset();
		} catch (err) {
			setFormError(err);
		}
	};

	return (
		<section className={classes.forgotPwd} onSubmit={submitHandler}>
			<h1>Confirm email</h1>
			<p>
				Enter the email associated with your account and we'll{' '}
				<span>send an email with link</span> to confirm your email
				address
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
				<Button type="submit" text="Send email" />
			</form>
		</section>
	);
};

export default SendConfirmEmailForm;
