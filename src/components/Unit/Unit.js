import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';

import classes from './Unit.module.css';

const Unit = ({ unit, isOwnUnit }) => {
	const numbersOfWords = unit.words.length || 0;
	return (
		<div className={classes.unit}>
			<Link className={classes.title} to={`/units/${unit._id}`}>
				{unit.name}
			</Link>
			<p>{isOwnUnit && `Creator: ${unit.creator}`}</p>
			<p>
				from <span>{unit.fromLang}</span> to <span>{unit.toLang}</span>
			</p>

			<p>{`${numbersOfWords} ${
				[0, 1].includes(numbersOfWords) ? 'word' : 'words'
			}`}</p>
			<p>{`<3 ${unit.popularity}`}</p>
			<div className={classes.actions}>
				<Button text="Play" />
				{isOwnUnit && <Button text="Edit" />}
			</div>
		</div>
	);
};

export default Unit;
