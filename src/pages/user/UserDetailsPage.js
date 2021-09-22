import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { sendRequest } from '../../utils/sendRequest';

import UserDetails from '../../components/User/UserDetails';

const UserDetailsPage = () => {
	const { userId } = useParams();
	const token = useSelector((state) => state.auth.token);
	const [user, setUser] = useState();

	useEffect(() => {
		const url = `${process.env.REACT_APP_BACKENDURL}/users/${userId}`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		async function fetchData() {
			const data = await sendRequest(url, requestObject);
			setUser(data.user);
		}
		fetchData();
	}, [userId, token]);

	return <>{user ? <UserDetails user={user} /> : null}</>;
};

export default UserDetailsPage;
