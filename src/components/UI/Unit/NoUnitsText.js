import React from 'react';
import { Link } from 'react-router-dom';

import classes from './NoUnitsText.module.css';

const NoUnitsText = ({ text, linkText, link }) => {
	return (
		<div className={classes.noUnit}>
			<p>
				{text} {link && <Link to={link}>{linkText}</Link>}
			</p>
		</div>
	);
};

export default NoUnitsText;
