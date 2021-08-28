import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
	const buttonClass = props.cancel ? 'cancel' : 'button';
	return (
		<button
			onClick={props.onClick}
			className={classes[buttonClass]}
			type={props.type}
		>
			{props.text}
		</button>
	);
};

export default Button;
