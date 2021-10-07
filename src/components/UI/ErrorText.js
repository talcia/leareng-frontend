import React from 'react';

import classes from './ErrorText.module.css';

const ErrorText = ({ text }) => {
	return <div className={classes.error}>{text}</div>;
};

export default ErrorText;
