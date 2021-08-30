import React from 'react';

import classes from './Button.module.css';

const Button = ({ cancel, onClick, type, text }) => {
	const buttonClass = cancel ? 'cancel' : 'button';
	return (
		<button onClick={onClick} className={classes[buttonClass]} type={type}>
			{text}
		</button>
	);
};

export default Button;
