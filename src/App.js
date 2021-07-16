import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/HomePage';
import UnitPage from './pages/UnitPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import SendConfirmEmailPage from './pages/auth/SendConfirmEmailPage';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getTokenFromLocalStorage } from './store/auth-actions';
import ConfirmEmailPage from './pages/auth/ConfirmEmailPage';
require('dotenv').config();

function App() {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const checkIfTokenInLocalStorage = async () => {
		try {
			await dispatch(getTokenFromLocalStorage());
		} catch (err) {
			throw err;
		}
	};

	useEffect(checkIfTokenInLocalStorage, [checkIfTokenInLocalStorage]);

	return (
		<Layout>
			<Switch>
				<Route path="/" exact>
					<HomePage />
				</Route>
				<Route path="/auth/login" exact>
					<AuthPage isLoginPage={true} />
				</Route>
				<Route path="/auth/signup" exact>
					<AuthPage isLoginPage={false} />
				</Route>
				<Route path="/auth/forgot-password" exact>
					<ForgotPasswordPage />
				</Route>
				<Route path="/auth/reset-password/:token">
					<ResetPasswordPage />
				</Route>
				<Route path="/auth/confirm-email/:token">
					<ConfirmEmailPage />
				</Route>
				<Route path="/auth/send-confirm-email">
					<SendConfirmEmailPage />
				</Route>
				{isAuth && (
					<Route path="/units">
						<UnitPage />
					</Route>
				)}
			</Switch>
		</Layout>
	);
}

export default App;
