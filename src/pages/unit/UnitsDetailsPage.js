import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NoUnitsText from '../../components/UI/Unit/NoUnitsText';

import UnitDetails from '../../components/Unit/UnitDetalis/UnitDetails';
import { sendRequest } from '../../utils/sendRequest';

const UnitsDetailsPage = () => {
	const { unitId } = useParams();
	const token = useSelector((state) => state.auth.token);
	const [unit, setUnit] = useState();
	const [erorrStatus, setErrorStatus] = useState();

	useEffect(() => {
		const url = `${process.env.REACT_APP_BACKENDURL}/units/${unitId}`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		async function fetchData() {
			try {
				const data = await sendRequest(url, requestObject, {
					401: 'Your email address is not confirm',
				});
				if (data.unit) setUnit(data.unit);
			} catch (err) {
				setErrorStatus(err.message);
			}
		}
		fetchData();
	}, [unitId, token]);

	return (
		<>
			{erorrStatus ? (
				<NoUnitsText text={erorrStatus} />
			) : unit ? (
				<UnitDetails unit={unit} />
			) : null}
		</>
	);
};

export default UnitsDetailsPage;
