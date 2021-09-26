import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import classes from './AccountContainer.module.css';

const AccountContainer = ({ children }) => {
	const { pathname } = useLocation();
	const splitLocation = pathname.split('/');

	return (
		<div className={classes.wrapper}>
			<div className={classes.nav}>
				<ul>
					<li>
						<Link
							to="general"
							className={
								splitLocation[2] === 'general'
									? classes.active
									: ''
							}
						>
							General
						</Link>
					</li>
					<li>
						<Link
							to="passwordSettings"
							className={
								splitLocation[2] === 'passwordSettings'
									? classes.active
									: ''
							}
						>
							Password
						</Link>
					</li>
					<li>
						<Link
							to="settings"
							className={
								splitLocation[2] === 'settings'
									? classes.active
									: ''
							}
						>
							Settings
						</Link>
					</li>
					<li>
						<Link
							to="help"
							className={
								splitLocation[2] === 'help'
									? classes.active
									: ''
							}
						>
							Help
						</Link>
					</li>
				</ul>
			</div>
			{children}
		</div>
	);
};

export default AccountContainer;
