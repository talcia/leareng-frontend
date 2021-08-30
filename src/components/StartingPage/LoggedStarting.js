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
				text={
					<>
						get max points of each unit and become{' '}
						<span>language master</span>
					</>
				}
			/>
			<div className={classes.search}>
				<div className={classes.title}>
					<TitleText
						text={
							<>
								To find specific unit faster you can search by
								key words or by language
							</>
						}
					/>
				</div>
				<Button
					text="Search by word"
					onClick={() => {
						onClickHandler('/units/search/word');
					}}
				/>
				<Button
					text="Search by lang"
					onClick={() => {
						onClickHandler('/units/search/lang');
					}}
				/>
			</div>
			<Units units={units} />
		</>
	);
};

export default LoggedStarting;
