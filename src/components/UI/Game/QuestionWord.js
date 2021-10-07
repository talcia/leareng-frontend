import React from 'react';
import Input from '../Input';
import Button from '../Button';
import useInput from '../../../hooks/use-input';
import { capitalize } from '../../../utils/capitalize';

import classes from './QuestionWord.module.css';

const QuestionWord = ({ wordsLeft, word, addAnswer, nextQuestion }) => {
	const {
		value: enteredTranslation,
		isValid: translationIsValid,
		hasError: translationHasError,
		reset: translationReset,
		valueChangeHandler: translationChangeHandler,
		inputBlurHandler: translationBlurHandler,
	} = useInput((value) => value !== '');

	const sumbitHandler = (e) => {
		e.preventDefault();

		if (!translationIsValid) {
			return;
		}

		addAnswer(enteredTranslation);
		nextQuestion();
		translationReset();
	};

	const passTheQuestion = () => {
		addAnswer('');
		nextQuestion();
	};

	return (
		<div className={classes.gameContainer}>
			<p>{wordsLeft ? `${wordsLeft} left` : `the last one`}</p>
			<h1>{capitalize(word)}</h1>

			<div className={classes.actions} onSubmit={sumbitHandler}>
				<form autoComplete="off">
					<Input
						type="text"
						id="name"
						placeholder="Translation"
						value={enteredTranslation}
						onChange={translationChangeHandler}
						onBlur={translationBlurHandler}
						hasError={translationHasError}
					/>
					<Button text="Next" type="submit" />
				</form>
				<Button text="Pass" cancel={true} onClick={passTheQuestion} />
			</div>
		</div>
	);
};

export default QuestionWord;
