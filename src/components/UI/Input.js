import React from 'react';

import classes from './Input.module.css';

const Input = ({ style, hasError, errorText, label, ...inputArgs }) => {
	return (
		<div className={classes.input} style={style}>
			<input
				type={inputArgs.type}
				id={inputArgs.id}
				required={inputArgs.required}
				placeholder={inputArgs.placeholder}
				value={inputArgs.value}
				onChange={inputArgs.onChange}
				onBlur={inputArgs.onBlur}
				{...inputArgs}
				className={hasError ? classes.invalid : ''}
			/>
			<label>{label}</label>
			{errorText && hasError && (
				<p className={classes.errorText}>{errorText && errorText}</p>
			)}
		</div>
	);
};

export default Input;
