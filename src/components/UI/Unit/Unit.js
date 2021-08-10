import React from 'react';

import { Link } from 'react-router-dom';
import Button from '../Button';
import Heart from '../Heart';

import classes from './Unit.module.css';

const Unit = ({ unit }) => {
	const numbersOfWords = unit.words.length || 0;
	return (
		<div className={classes.unit}>
			<Link className={classes.title} to={`/units/${unit._id}`}>
				{unit.name}
			</Link>
			<p>
				from <span>{unit.fromLang}</span> to <span>{unit.toLang}</span>
			</p>

			<p>{`${numbersOfWords} ${
				[0, 1].includes(numbersOfWords) ? 'word' : 'words'
			}`}</p>
			<Heart unit={unit} />
			<div className={classes.actions}>
				<Button text="Play" />
			</div>
		</div>
	);
};

export default Unit;
