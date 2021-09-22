import React from 'react';
import { Link } from 'react-router-dom';
import TitleText from '../UI/TitleText';

import classes from './UnloggedStarting.module.css';

const UnloggedStarting = () => {
	return (
		<>
			<TitleText
				title="Check the most popular units or create your own"
				text={
					<>
						get max points of each unit and become{' '}
						<span>language master</span>
					</>
				}
			/>
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
