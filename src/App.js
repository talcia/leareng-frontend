import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/auth/AuthPage';
import HomePage from './pages/HomePage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { getTokenFromLocalStorage } from './store/auth-actions';

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
			</Switch>
		</Layout>
	);
}

export default App;
