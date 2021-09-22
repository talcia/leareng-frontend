import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UnitPage from './UnitPage';
import SearchPage from './SearchPage';

const UnitIndex = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	return (
		<Switch>
			{isAuth && (
				<>
					<Route path="/units">
						<UnitPage />
					</Route>
					<Route path="/units/search">
						<SearchPage />
					</Route>
				</>
			)}
		</Switch>
	);
};

export default UnitIndex;
