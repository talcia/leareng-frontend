import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { sendRequest } from '../../utils/sendRequest';
import Units from '../UI/Unit/Units';

import classes from './LoggedStarting.module.css';

const LoggedStarting = () => {
	const [units, setUnits] = useState([]);
	const token = useSelector((state) => state.auth.token);

	useEffect(() => {
		const url = `${process.env.REACT_APP_BACKENDURL}/units`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		async function fetchData() {
			const data = await sendRequest(url, requestObject);
			setUnits(data.units);
		}
		fetchData();
	}, [token]);

	return (
		<>
			<div className={classes.title}>
				<h2>Check the most popular units from all users</h2>
				<p>
					get max points of each unit and become{' '}
					<span>language master</span>
				</p>
			</div>
			<Units units={units} />
		</>
	);
};

export default LoggedStarting;
