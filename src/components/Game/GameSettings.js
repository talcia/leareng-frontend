import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import useInput from '../../hooks/use-input';

import classes from './GameSettings.module.css';
import Input from '../UI/Input';

const GameSettings = ({ unit, startGame }) => {
	const [reverse, setReverse] = useState(false);
	const {
		value: enteredWordsAmount,
		isValid: wordsAmountIsValid,
		hasError: wordsAmountHasError,
		reset: wordsAmountReset,
		valueChangeHandler: wordsAmountChangeHandler,
		inputBlurHandler: wordsAmountBlurHandler,
	} = useInput((value) => value > 0, 1);

	const reverseHandler = () => {
		setReverse((state) => !state);
	};

	const startGameHandler = () => {
		if (!wordsAmountIsValid) {
			return;
		}
		startGame(reverse, enteredWordsAmount);
		wordsAmountReset();
	};

	return (
		<div className={classes.gameSettingContainer}>
			{unit && (
				<>
					<div className={classes.title}>
						<h2>{unit.name}</h2>
						<p>
							Please choose from which language you want to
							translate word and how many words you want to
							translate in this round
						</p>
					</div>
					<div className={classes.actions}>
						<p>Language:</p>
						<p>
							<span>{unit.fromLang.toUpperCase()}</span>
							<FontAwesomeIcon
								icon={faLongArrowAltRight}
								onClick={reverseHandler}
								className={
									reverse
										? classes.reverse
										: classes.notReverse
								}
							/>
							<span>{unit.toLang.toUpperCase()}</span>
						</p>
					</div>
					<div className={classes.numbers}>
						<p>Numbers of words: </p>{' '}
						<Input
							type="number"
							id="name"
							placeholder="Name"
							value={enteredWordsAmount}
							onChange={wordsAmountChangeHandler}
							onBlur={wordsAmountBlurHandler}
							hasError={wordsAmountHasError}
							errorText={'Name must not be empty'}
							min={1}
							max={unit.words.length}
							style={{ maxWidth: '220px' }}
						/>
					</div>
					<button
						onClick={startGameHandler}
						className={classes.buttonStyle}
						style={{ maxWidth: '220px' }}
					>
						Play
					</button>
				</>
			)}
		</div>
	);
};

export default GameSettings;
