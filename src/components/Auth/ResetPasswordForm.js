import React from 'react';
import { useState } from 'react';
import useInput from '../../hooks/use-input';

import Input from '../UI/Input';
import Button from '../UI/Button';
import ConfirmMessage from './ConfirmMessage';

import classes from './ResetPasswordForm.module.css';
import { sendRequest } from '../../utils/sendRequest';

const ResetPasswordForm = ({ setIsEmailWasSent, token }) => {
	const [formError, setFormError] = useState(null);
	const [showMessage, setShowMessage] = useState(false);

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

		const url = `${process.env.REACT_APP_BACKENDURL}/auth/resetPassword/${token}`;
		const requestObject = {
			method: 'POST',
			data: passwordData,
		};
		const errorMessage = {
			404: 'Sorry but your link is invalid',
			422: 'Sorry but your link expired',
		};

		try {
			await sendRequest(url, requestObject, errorMessage);
			setIsEmailWasSent(true);
			passwordReset();
			confirmPasswordReset();
			setShowMessage(true);
		} catch (err) {
			console.log(err);
			setFormError({
				title: err.message,
				message: 'You can ask to send confirm email again',
			});
			setShowMessage(true);
		}
	};

	return (
		<>
			{!showMessage ? (
				<section className={classes.resetPwd}>
					<h1>Create new password</h1>
					<p>
						Please provide at least 8 characters long password and
						confirm it
					</p>
					<form onSubmit={submitHandler}>
						<Input
							type="password"
							id="password"
							placeholder="Password"
							value={enteredPassword}
							onChange={passwordChangeHandler}
							onBlur={passwordBlurHandler}
							hasError={passwordHasError}
							errorText={
								'Password must be at least 6 characters long'
							}
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
			) : (
				<ConfirmMessage
					title={formError ? formError.title : 'Something went wrong'}
					message={
						formError
							? formError.message
							: 'Please try again by sending link again'
					}
					isButtonVisible={formError}
					buttonLink={'/account/passwordSettings'}
					buttonText={'Send link again'}
				/>
			)}
		</>
	);
};

export default ResetPasswordForm;
