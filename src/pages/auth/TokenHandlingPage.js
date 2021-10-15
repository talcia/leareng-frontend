import React from 'react';
import { useParams } from 'react-router';
import ConfirmEmailPage from './ConfirmEmailPage';
import ResetPasswordPage from './ResetPasswordPage';

const TokenHandlingPage = () => {
	const { token } = useParams();

	const code = token.slice(0, 8);
	const tokenCode = token.slice(8, token.length);

	console.log(code);
	console.log(tokenCode);

	return (
		<>
			{code === 'password' ? (
				<ResetPasswordPage token={tokenCode} />
			) : (
				<ConfirmEmailPage token={tokenCode} />
			)}
		</>
	);
};

export default TokenHandlingPage;
