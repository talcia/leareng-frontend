import React from 'react';
import { useSelector } from 'react-redux';
import AccountPage from './AccountPage';

const AccountIndex = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);

	return (
		<>
			{isAuth && (
				<>
					<AccountPage />
				</>
			)}
		</>
	);
};

export default AccountIndex;
