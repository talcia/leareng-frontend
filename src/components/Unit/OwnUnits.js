import React from 'react';
import { useSelector } from 'react-redux';
import NoUnitsText from '../UI/Unit/NoUnitsText';

import Units from '../UI/Unit/Units';

const OwnUnits = () => {
	const units = useSelector((state) => state.unit.ownUnits) || [];

	return (
		<div>
			{units.length === 0 ? (
				<NoUnitsText
					text={'You have not created any units yet.'}
					linkText={'Create one!'}
					link={'/units/add'}
				/>
			) : (
				<Units units={units} />
			)}
		</div>
	);
};

export default OwnUnits;
