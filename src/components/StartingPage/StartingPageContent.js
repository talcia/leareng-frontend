import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Units from '../UI/Unit/Units';

import classes from './StartingPageContent.module.css';

const StartingPageContent = () => {
	const [units, setUnits] = useState([]);
	const token = useSelector((state) => state.auth.token);

	const url = `${process.env.REACT_APP_BACKENDURL}/units`;

	useEffect(() => {
		fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((response) => response.json())
			.then((data) => setUnits(data.units));
	}, [url, token]);

	return (
		<>
			<div className={classes.title}>
				<h2>Check the most popular units</h2>
				<p>
					get max points of each and become{' '}
					<span>language master</span>
				</p>
			</div>
			<Units units={units} />
		</>
	);
};

export default StartingPageContent;
