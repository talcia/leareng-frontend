import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { sendRequest } from '../../utils/sendRequest';
import Units from '../UI/Unit/Units';
import Button from '../UI/Button';

import classes from './LoggedStarting.module.css';
import TitleText from '../UI/TitleText';

const LoggedStarting = () => {
	const [units, setUnits] = useState([]);
	const token = useSelector((state) => state.auth.token);
	const history = useHistory();

	const onClickHandler = (link) => {
		history.push(link);
	};

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
			<TitleText
				title="Check the most popular units from all users"
				// text={
				// 	<>
				// 		get max points of each unit and become{' '}
				// 		<span>language master</span>
				// 	</>
				// }
				text={
					<>
						To find specific unit faster you can search by{' '}
						<span
							className={classes.clickable}
							onClick={() => {
								onClickHandler('/units/search/word');
							}}
						>
							key words
						</span>{' '}
						or by{' '}
						<span
							className={classes.clickable}
							onClick={() => {
								onClickHandler('/units/search/lang');
							}}
						>
							language
						</span>
					</>
				}
			/>
			<Units units={units} />
		</>
	);
};

export default LoggedStarting;
