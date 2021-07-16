import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState } from 'react';
import useInput from '../../hooks/use-input';

import Input from '../UI/Input';
import ErrorText from '../UI/ErrorText';
import ReactSpinner from 'react-bootstrap-spinner';

import classes from './AuthForm.module.css';
import { useDispatch } from 'react-redux';
import { signupUser, loginUser } from '../../store/auth-actions';

const AuthForm = (props) => {
	const history = useHistory();
	const [formError, setFormError] = useState(null);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);

	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		reset: nameReset,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => value.trim() !== '');
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

	const changeFormHandler = () => {
		nameReset();
		emailReset();
		passwordReset();
		confirmPasswordReset();
		setFormError(null);
		history.push(props.isLogin ? '/auth/signup' : '/auth/login');
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		nameBlurHandler();
		emailBlurHandler();
		passwordBlurHandler();
		confirmPasswordBlurHandler();

		let formIsValid = false;

		if (props.isLogin && emailIsValid && passwordIsValid) {
			formIsValid = true;
		}

		if (
			!props.isLogin &&
			nameIsValid &&
			emailIsValid &&
			passwordIsValid &&
			confirmPasswordIsValid
		) {
			formIsValid = true;
		}

		if (!formIsValid) {
			return;
		}

		let userData;
		if (props.isLogin) {
			setIsLoading(true);
			userData = {
				email: enteredEmail,
				password: enteredPassword,
			};

			try {
				await dispatch(loginUser(userData));
				history.replace('/');
			} catch (err) {
				setFormError(err.message);
			}
		} else if (!props.isLogin) {
			userData = {
				name: enteredName,
				email: enteredEmail,
				password: enteredPassword,
			};
			try {
				await dispatch(signupUser(userData));
				history.push('/auth/login');
			} catch (err) {
				setFormError(err.message);
			}
		}
	};

	const linkStatementOnPage = (
		<p>
			{props.isLogin ? `Don't have one? ` : ' Already have one?'}
			<span onClick={changeFormHandler}>
				{props.isLogin ? 'Sign up free ' : ' Login here'}
			</span>
		</p>
	);

	return (
		<section className={classes.auth}>
			<h1>
				{props.isLogin ? 'Login to your account' : 'Create account'}
			</h1>
			<p>{linkStatementOnPage}</p>
			{formError && <ErrorText text={formError} />}
			<form onSubmit={submitHandler} noValidate>
				{!props.isLogin && (
					<Input
						type="text"
						id="name"
						placeholder="Name"
						value={enteredName}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						hasError={nameHasError}
						errorText={'Name must not be empty'}
					/>
				)}
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
				{props.isLogin && (
					<div className={classes.frgtPass}>
						<Link to="/auth/forgot-password">Forgot password?</Link>
					</div>
				)}
				{!props.isLogin && (
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
				)}
				<div>
					<button className={classes.button}>
						{isLoading ? (
							<ReactSpinner animation="border" role="status" />
						) : props.isLogin ? (
							'Login'
						) : (
							'Sign up'
						)}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
