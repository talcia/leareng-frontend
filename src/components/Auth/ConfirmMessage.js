import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ConfirmMessage.module.css';

const ConfirmMessage = ({
	title,
	message,
	isButtonVisible,
	buttonLink,
	buttonText,
}) => {
	return (
		<section className={classes.confirmMessage}>
			<h1>{title}</h1>
			<p>{message}</p>
			{isButtonVisible && <Link to={buttonLink}>{buttonText}</Link>}
		</section>
	);
};

export default ConfirmMessage;
