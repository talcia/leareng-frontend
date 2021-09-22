import React from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthPage from './AuthPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import ResetPasswordPage from './ResetPasswordPage';
import SendConfirmEmailPage from './SendConfirmEmailPage';
import AccountCreatedPage from './AccountCreatedPage';
import ConfirmEmailPage from './ConfirmEmailPage';

const AuthIndex = () => {
	return (
		<Switch>
			<Route path="/auth/login" exact>
				<AuthPage isLoginPage={true} />
			</Route>
			<Route path="/auth/signup" exact>
				<AuthPage isLoginPage={false} />
			</Route>
			<Route path="/auth/account-created" exact>
				<AccountCreatedPage />
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
		</Switch>
	);
};

export default AuthIndex;
