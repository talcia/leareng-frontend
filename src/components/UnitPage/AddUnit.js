import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useInput from '../../hooks/use-input';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addUnit } from '../../store/unit-actions';

import Input from '../UI/Input';
import ErrorText from '../UI/ErrorText';

import classes from './AddUnit.module.css';

const AddUnit = () => {
	const [formError, setFormError] = useState(null);
	const [isPrivate, setIsPrivate] = useState(false);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();
	const history = useHistory();

	const {
		value: enteredName,
		isValid: nameIsValid,
		hasError: nameHasError,
		reset: nameReset,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredFromLang,
		isValid: fromLangIsValid,
		hasError: fromLangHasError,
		reset: fromLangReset,
		valueChangeHandler: fromLangChangeHandler,
		inputBlurHandler: fromLangBlurHandler,
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredToLang,
		isValid: toLangIsValid,
		hasError: toLangHasError,
		reset: toLangReset,
		valueChangeHandler: toLangChangeHandler,
		inputBlurHandler: toLangBlurHandler,
	} = useInput((value) => value.trim() !== '');

	const submitHandler = async (e) => {
		e.preventDefault();
		nameBlurHandler();
		toLangBlurHandler();
		fromLangBlurHandler();

		if (!nameIsValid || !fromLangIsValid || !toLangIsValid) {
			return;
		}

		const unitData = {
			name: enteredName,
			fromLang: enteredFromLang,
			toLang: enteredToLang,
			private: isPrivate,
		};

		try {
			await dispatch(addUnit(unitData, token));
			history.replace('/units');
		} catch (err) {
			setFormError(err.message);
		}
	};

	return (
		<section className={classes.addUnit}>
			<h1>Create new unit</h1>
			{formError && <ErrorText text={formError} />}

			<form onSubmit={submitHandler}>
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
				<Input
					type="text"
					id="fromLang"
					placeholder="From language"
					value={enteredFromLang}
					onChange={fromLangChangeHandler}
					onBlur={fromLangBlurHandler}
					hasError={fromLangHasError}
					errorText={'From language value must not be empty'}
				/>
				<Input
					type="text"
					id="toLang"
					placeholder="To language"
					value={enteredToLang}
					onChange={toLangChangeHandler}
					onBlur={toLangBlurHandler}
					hasError={toLangHasError}
					errorText={'To language value must not be empty'}
				/>
				<div className={classes.checkbox}>
					<input
						type="checkbox"
						id="isPrivate"
						placeholder=""
						label="Private"
						checked={isPrivate}
						onChange={() => {
							setIsPrivate((prevState) => !prevState);
						}}
					/>
					<label htmlFor="isPrivate">Private</label>
				</div>
				<button type="submit">Add unit</button>
			</form>
		</section>
	);
};

export default AddUnit;
