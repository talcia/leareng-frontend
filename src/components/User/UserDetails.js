import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendRequest } from '../../utils/sendRequest';
import PageTitle from '../UI/PageTitle';
import Units from '../UI/Unit/Units';

import classes from './UserDetails.module.css';

const UserDetails = ({ user }) => {
	const token = useSelector((state) => state.auth.token);
	const [units, setUnits] = useState();

	useEffect(() => {
		const url = `${process.env.REACT_APP_BACKENDURL}/users/${user._id}/units`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		async function fetchData() {
			const data = await sendRequest(url, requestObject);
			setUnits(data.user.units);
			console.log(data.user.units);
		}
		fetchData();
	}, [user._id, token]);

	return (
		<>
			<div className={classes.detailsTitle}>
				<PageTitle
					title={'Here is a details of user'}
					text={'You can check units and stats of this user'}
				/>
			</div>
			<div className={classes.wrapper}>
				<div className={classes.userDetails}>
					<div className={classes.avatar}></div>
					<p>{user.name}</p>
				</div>
			</div>
			<div className={classes.userUnits}>
				<p className={classes.createdUnits}>
					Units created by this user:
				</p>
				{units && <Units units={units} />}
			</div>
		</>
	);
};

export default UserDetails;
