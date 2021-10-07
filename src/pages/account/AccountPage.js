import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { sendRequest } from '../../utils/sendRequest';
import AccountContainer from '../../components/Account/AccountContainer';
import General from '../../components/Account/General';
import PasswordSettings from '../../components/Account/PasswordSettings';
import Help from '../../components/Account/Help';
import Settings from '../../components/Account/Settings';
import { Switch, Route } from 'react-router';
import PageTitle from '../../components/UI/PageTitle';

const AccountPage = () => {
	const userId = useSelector((state) => state.auth.userId);
	const token = useSelector((state) => state.auth.token);
	const [user, setUser] = useState();

	const fetchUser = useCallback(async () => {
		const url = `${process.env.REACT_APP_BACKENDURL}/users/${userId}`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		const data = await sendRequest(url, requestObject);
		setUser(data.user);
	}, [token, userId]);

	useEffect(() => {
		fetchUser();
	}, [userId, token, fetchUser]);

	const layoutRender = (children) => (
		<>
			<PageTitle
				title="Account settings"
				text="Here you can change your profile settings"
			/>
			<AccountContainer>{children}</AccountContainer>
		</>
	);

	return (
		<Switch>
			{user && (
				<>
					<Route path="/account/general" exact>
						{layoutRender(
							<General user={user} fetchUser={fetchUser} />
						)}
					</Route>
					<Route path="/account/passwordSettings" exact>
						{layoutRender(<PasswordSettings user={user} />)}
					</Route>
					<Route path="/account/settings" exact>
						{layoutRender(<Settings />)}
					</Route>
					<Route path="/account/help" exact>
						{layoutRender(<Help />)}
					</Route>
				</>
			)}
		</Switch>
	);
};

export default AccountPage;
