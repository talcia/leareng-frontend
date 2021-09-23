import React from 'react';
import { useSelector } from 'react-redux';
import AccountPage from './AccountPage';
import PageTitle from '../../components/UI/PageTitle';

const UserIndex = () => {
	const isAuth = useSelector((state) => state.auth.isAuthenticated);

	return (
		<>
			{isAuth && (
				<>
					<PageTitle
						title="Account settings"
						text="Here you can change your profile settings"
					/>
					<AccountPage />
				</>
			)}
		</>
	);
};

export default UserIndex;
