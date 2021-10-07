import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { Link, useHistory } from 'react-router-dom';
import useCreator from '../../../hooks/use-creator';
import Button from '../Button';
import Heart from '../Heart';

import classes from './Unit.module.css';

const Unit = ({ unit }) => {
	const numbersOfWords = unit.words.length || 0;
	const isCreator = useCreator(unit.creator);
	const history = useHistory();

	const editHandler = () => {
		history.push(`/units/edit/${unit._id}`, { unit });
	};

	const onClickHandler = () => {
		history.push(`play/${unit._id}`);
	};

	return (
		<div className={classes.unit}>
			<p className={classes.owner}>
				{isCreator && (
					<FontAwesomeIcon
						icon={faPen}
						color={'var(--orange)'}
						onClick={editHandler}
					/>
				)}
			</p>

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
				<Button
					text="Play"
					onClick={onClickHandler}
					disabled={numbersOfWords === 0}
				/>
			</div>
		</div>
	);
};

export default Unit;
