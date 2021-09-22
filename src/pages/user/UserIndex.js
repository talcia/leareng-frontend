import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserDetailsPage from './UserDetailsPage';

const UserIndex = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);

	return (
		<Switch>
			{isAuth && (
				<>
					<Route path="/users/:userId">
						<UserDetailsPage />
					</Route>
				</>
			)}
		</Switch>
	);
};

export default UserIndex;
