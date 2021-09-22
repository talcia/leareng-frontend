import React from 'react';
import { Link } from 'react-router-dom';

import classes from './MobileNavigation.module.css';

const MobileNavigation = () => {
	return (
		<div className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>Leareng</div>
			</Link>
		</div>
	);
};

export default MobileNavigation;
