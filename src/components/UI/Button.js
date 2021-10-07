import React from 'react';

import classes from './Button.module.css';

const Button = ({ cancel, onClick, type, text, disabled }) => {
	const buttonClass = cancel || disabled ? 'cancel' : 'button';

	return (
		<button
			onClick={onClick}
			className={classes[buttonClass]}
			type={type}
			disabled={disabled}
		>
			{text}
		</button>
	);
};

export default Button;
