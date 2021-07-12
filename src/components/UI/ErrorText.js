import React from 'react';

import classes from './ErrorText.module.css';

const ErrorText = (props) => {
	return <div className={classes.error}>{props.text}</div>;
};

export default ErrorText;
