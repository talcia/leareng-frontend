import React from 'react';
import { Link } from 'react-router-dom';

import classes from './ConfirmMessage.module.css';

const ConfirmMessage = ({ title, message }) => {
	return (
		<section className={classes.confirmMessage}>
			<h1>{title}</h1>
			<p>{message}</p>
			<Link to="/auth/login">Back to login page</Link>
		</section>
	);
};

export default ConfirmMessage;
