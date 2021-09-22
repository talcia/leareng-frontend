import React from 'react';

import classes from './PageTitle.module.css';

const PageTitle = ({ title, text }) => {
	return (
		<div className={classes.title}>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	);
};

export default PageTitle;
