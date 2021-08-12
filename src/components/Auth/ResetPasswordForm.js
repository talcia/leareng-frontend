import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useInput from '../../hooks/use-input';

import Input from '../UI/Input';
import ErrorText from '../UI/ErrorText';
import Button from '../UI/Button';

import classes from './ResetPasswordForm.module.css';
import { sendRequest } from '../../utils/sendRequest';

const ResetPasswordForm = ({ setIsEmailWasSent }) => {
	const [formError, setFormError] = useState(null);
	const { token } = useParams();

	const {
		value: enteredPassword,
		isValid: passwordIsValid,
		hasError: passwordHasError,
		reset: passwordReset,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredConfirmPassword,
		isValid: confirmPasswordIsValid,
		hasError: confirmPasswordHasError,
		reset: confirmPasswordReset,
		valueChangeHandler: confirmPasswordChangeHandler,
		inputBlurHandler: confirmPasswordBlurHandler,
	} = useInput(
		(value) => value.trim() !== '' && value.trim() === enteredPassword
	);

	const submitHandler = async (e) => {
		e.preventDefault();
		passwordBlurHandler();
		confirmPasswordBlurHandler();

		console.log(token);

		if (
			!passwordIsValid ||
			!confirmPasswordIsValid ||
			enteredPassword !== enteredConfirmPassword
		) {
			return;
		}

		const passwordData = {
			password: enteredPassword,
		};

		const url = `${process.env.REACT_APP_BACKENDURL}/auth/resetPassword`;
		const requestObject = {
			method: 'POST',
			data: passwordData,
		};

		try {
			await sendRequest(url, requestObject);
			setIsEmailWasSent(true);
			passwordReset();
			confirmPasswordReset();
		} catch (err) {
			setFormError(err);
		}
	};

	return (
		<section className={classes.resetPwd}>
			<h1>Create new password</h1>
			<p>
				Please provide at least 8 characters long password and confirm
				it
			</p>
			{formError && <ErrorText text={formError} />}
			<form onSubmit={submitHandler}>
				<Input
					type="password"
					id="password"
					placeholder="Password"
					value={enteredPassword}
					onChange={passwordChangeHandler}
					onBlur={passwordBlurHandler}
					hasError={passwordHasError}
					errorText={'Password must be at least 6 characters long'}
				/>
				<Input
					type="password"
					id="confirmPassword"
					placeholder="Confirm password"
					value={enteredConfirmPassword}
					onChange={confirmPasswordChangeHandler}
					onBlur={confirmPasswordBlurHandler}
					hasError={confirmPasswordHasError}
					errorText={`Passwords don't match`}
				/>
				<Button type="submit" text="Reset Password" />
			</form>
		</section>
	);
};

export default ResetPasswordForm;
