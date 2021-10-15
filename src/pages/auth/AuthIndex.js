import React from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import AuthPage from './AuthPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import SendConfirmEmailPage from './SendConfirmEmailPage';
import AccountCreatedPage from './AccountCreatedPage';
import { useSelector } from 'react-redux';

const AuthIndex = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);
	const history = useHistory();

	const redicretToHomePage = () => {
		history.push('/');
	};
	return (
		<Switch>
			<Route path="/auth/login" exact>
				{isAuth ? (
					redicretToHomePage()
				) : (
					<AuthPage isLoginPage={true} />
				)}
			</Route>
			<Route path="/auth/signup" exact>
				{isAuth ? (
					redicretToHomePage()
				) : (
					<AuthPage isLoginPage={false} />
				)}
			</Route>
			<Route path="/auth/account-created" exact>
				{isAuth ? redicretToHomePage() : <AccountCreatedPage />}
			</Route>
			<Route path="/auth/forgot-password" exact>
				<ForgotPasswordPage />
			</Route>
			<Route path="/auth/send-confirm-email">
				<SendConfirmEmailPage />
			</Route>
		</Switch>
	);
};

export default AuthIndex;
