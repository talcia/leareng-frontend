import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import { getTokenFromLocalStorage } from './store/auth-actions';
import { fetchOwnUnits, fetchFavouriteUnits } from './store/unit-actions';
import AuthIndex from './pages/auth/AuthIndex';
import UnitIndex from './pages/unit/UnitIndex';
import UserIndex from './pages/user/UserIndex';
import AccountIndex from './pages/account/AccountIndex';
import TokenHandlingPage from './pages/auth/TokenHandlingPage';

import Container from './components/UI/Container';
import ApplyTheme from './components/UI/ApplyTheme';
import GameIndex from './pages/game/GameIndex';

require('dotenv').config();

function App() {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);

	const checkIfTokenInLocalStorage = async () => {
		try {
			await dispatch(getTokenFromLocalStorage());
			if (isAuth) {
				await dispatch(fetchOwnUnits(token));
				await dispatch(fetchFavouriteUnits(token));
			}
		} catch (err) {
			throw err;
		}
	};

	useEffect(checkIfTokenInLocalStorage, [checkIfTokenInLocalStorage, token]);

	return (
		<ApplyTheme>
			<Layout>
				<Container>
					<Switch>
						<Route path="/" exact>
							<HomePage />
						</Route>
						<Route path="/auth">
							<AuthIndex />
						</Route>
						<Route path="/units">
							<UnitIndex />
						</Route>
						<Route path="/users">
							<UserIndex />
						</Route>
						<Route path="/account">
							<AccountIndex />
						</Route>
						<Route path="/play">
							<GameIndex />
						</Route>
						<Route path="/:token">
							<TokenHandlingPage />
						</Route>
					</Switch>
				</Container>
			</Layout>
		</ApplyTheme>
	);
}

export default App;
