import React from 'react';
import { Link } from 'react-router-dom';

import classes from './AccountContainer.module.css';

const AccountContainer = ({ children }) => {
	return (
		<div className={classes.wrapper}>
			<div className={classes.nav}>
				<ul>
					<li>
						<Link to="general">General</Link>
					</li>
					<li>
						<Link to="passwordSettings">Password</Link>
					</li>
					<li>
						<Link to="settings">Settings</Link>
					</li>
					<li>
						<Link to="help">Help</Link>
					</li>
				</ul>
			</div>
			{children}
		</div>
	);
};

export default AccountContainer;
