import React from 'react';

import classes from './Unit.module.css';

const Unit = ({ unit, isOwnUnit }) => {
	const numbersOfWords = unit.words.length || 0;
	return (
		<div className={classes.unit}>
			<p className={classes.title}>{unit.name}</p>
			<p>{isOwnUnit && `Creator: ${unit.creator}`}</p>
			<p>
				from <span>{unit.fromLang}</span> to <span>{unit.toLang}</span>
			</p>

			<p>{`${numbersOfWords} ${
				[0, 1].includes(numbersOfWords) ? 'word' : 'words'
			}`}</p>
			<p>{`<3 ${unit.popularity || 0}`}</p>
			<div className={classes.actions}>
				<button>Play</button>
				{isOwnUnit && <button>Edit</button>}
			</div>
		</div>
	);
};

export default Unit;
