import React from 'react';
import { useSelector } from 'react-redux';
import Units from '../UI/Unit/Units';

const OwnUnits = () => {
	const units = useSelector((state) => state.unit.ownUnits) || [];

	return (
		<div>
			<Units units={units} errorText={"You haven't added any unit yet"} />
		</div>
	);
};

export default OwnUnits;
