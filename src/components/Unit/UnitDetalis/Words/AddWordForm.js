import React from 'react';
import useInput from '../../../../hooks/use-input';
import Input from '../../../UI/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import classes from './AddWordForm.module.css';

const AddWordForm = ({ fromLang, toLang, setFormError, addWordHandler }) => {
	const {
		value: enteredWord,
		isValid: wordIsValid,
		hasError: wordHasError,
		reset: wordReset,
		valueChangeHandler: wordChangeHandler,
		inputBlurHandler: wordBlurHandler,
	} = useInput((value) => value.trim() !== '');
	const {
		value: enteredTranslation,
		isValid: translationIsValid,
		hasError: translationHasError,
		reset: translationReset,
		valueChangeHandler: translationChangeHandler,
		inputBlurHandler: translationBlurHandler,
	} = useInput((value) => value.trim() !== '');

	const addWord = async (e) => {
		wordBlurHandler();
		translationBlurHandler();

		if (!wordIsValid || !translationIsValid) {
			return;
		}

		const wordData = {
			word: enteredWord,
			translation: enteredTranslation,
			fromLang,
			toLang,
		};

		await addWordHandler(e, wordData);

		wordReset();
		translationReset();
	};

	return (
		<form onSubmit={addWord} className={classes.wordForm}>
			<Input
				type="text"
				id="word"
				placeholder="word"
				value={enteredWord}
				onChange={wordChangeHandler}
				onBlur={wordBlurHandler}
				hasError={wordHasError}
				errorText={''}
			/>
			<Input
				type="text"
				id="translation"
				placeholder="translation"
				value={enteredTranslation}
				onChange={translationChangeHandler}
				onBlur={translationBlurHandler}
				hasError={translationHasError}
				errorText={''}
			/>
			<button type="submit" className={classes.addWord}>
				<FontAwesomeIcon icon={faPlusCircle} color={'var(--orange)'} />
			</button>
		</form>
	);
};

export default AddWordForm;
