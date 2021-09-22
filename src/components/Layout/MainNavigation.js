import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/auth-actions';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const userId = useSelector((state) => state.auth.userId);

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
								<Link to="/units">Units</Link>
							</li>
							<li>
<<<<<<< HEAD
								<Link to={`/user/${userId}`}>Account</Link>
=======
								<Link to="/">Account</Link>
>>>>>>> 482afb17d297c316f1701baae2c7a282e33cce35
							</li>
							<li>
								<Link
									to="/auth/login"
									onClick={() => dispatch(logoutUser())}
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
