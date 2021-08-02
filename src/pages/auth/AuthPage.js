import React from 'react';
import AuthForm from '../../components/Auth/AuthForm';

const AuthPage = (props) => {
	return (
		<div>
			<AuthForm isLogin={props.isLoginPage} />
		</div>
	);
};

export default AuthPage;
