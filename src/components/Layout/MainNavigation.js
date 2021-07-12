import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/auth-slice';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	return (
		<header className={classes.header}>
			<Link to="/">
				<div className={classes.logo}>Leareng</div>
			</Link>
			<nav>
				<ul>
					{!isAuth && (
						<li>
							<Link to="/auth/login">Login</Link>
						</li>
					)}
					{isAuth && (
						<>
							<li>
								<Link to="/units">Add Unit</Link>
							</li>
							<li>
								<Link
									to="/auth/login"
									onClick={() =>
										dispatch(authActions.logout())
									}
								>
									Logout
								</Link>
							</li>
						</>
					)}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
