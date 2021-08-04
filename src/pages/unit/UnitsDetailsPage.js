import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import UnitDetails from '../../components/Unit/UnitDetalis/UnitDetails';

const UnitsDetailsPage = () => {
	const { unitId } = useParams();
	const token = useSelector((state) => state.auth.token);
	const [unit, setUnit] = useState();
	console.log(unitId);
	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKENDURL}/units/${unitId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		})
			.then((data) => data.json())
			.then((data) => setUnit(data.unit))
			.catch((err) => {
				console.log(err);
			});
	}, [unitId, token]);
	console.log(unit);

	return <>{unit ? <UnitDetails unit={unit} /> : null}</>;
};

export default UnitsDetailsPage;
