import React from 'react';
import { Link } from 'react-router-dom';

import classes from './UnloggedStarting.module.css';

const UnloggedStarting = () => {
	return (
		<>
			<div className={classes.title}>
				<h2>Check the most popular units or create your own</h2>
				<p>
					get max points of each unit and become{' '}
					<span>language master</span>
				</p>
			</div>
			<div className={classes.desc}>
				lorem ipsum sad a as asda ds lorem ipsum sad a as asda ds lorem
				ipsum sad a as asda ds lorem ipsum sad a as asda ds
			</div>
			<div className={classes.action}>
				<p>
					But first you need to <Link to="/auth/login">login</Link> if
					you already have an account or{' '}
					<Link to="/auth/signup">sign up</Link> if you don't have one
				</p>
			</div>
		</>
	);
};

export default UnloggedStarting;
