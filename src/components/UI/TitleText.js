import React from 'react';

import classes from './TitleText.module.css';

const TitleText = ({ title, text }) => {
	return (
		<div className={classes.title}>
			<h2>{title}</h2>
			<p>{text}</p>
		</div>
	);
};

export default TitleText;
