import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UnitDetails from '../../components/Unit/UnitDetalis/UnitDetails';
import { sendRequest } from '../../utils/sendRequest';

const UnitsDetailsPage = () => {
	const { unitId } = useParams();
	const token = useSelector((state) => state.auth.token);
	const [unit, setUnit] = useState();

	useEffect(() => {
		const url = `${process.env.REACT_APP_BACKENDURL}/units/${unitId}`;
		const requestObject = {
			method: 'GET',
			token: token,
		};
		async function fetchData() {
			const data = await sendRequest(url, requestObject);
			setUnit(data.unit);
		}
		fetchData();
	}, [unitId, token]);

	return <>{unit ? <UnitDetails unit={unit} /> : null}</>;
};

export default UnitsDetailsPage;
