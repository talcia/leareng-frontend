import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
	return (
		<div className={classes.input} style={props.style}>
			<input
				type={props.type}
				id={props.id}
				required={props.required}
				placeholder={props.placeholder}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
				className={props.hasError ? classes.invalid : ''}
			/>
			<label>{props.label}</label>
			{props.hasError && (
				<p className={classes.errorText}>{props.errorText}</p>
			)}
		</div>
	);
};

export default Input;
