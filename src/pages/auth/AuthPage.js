import React from 'react';
import AuthForm from '../../components/Auth/AuthForm';

const AuthPage = (props) => {
	return (
		<div>
			{props.isLoginPage ? (
				<AuthForm isLogin={true} />
			) : (
				<AuthForm isLogin={false} />
			)}
		</div>
	);
};

export default AuthPage;
