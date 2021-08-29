import React from 'react';
import { useSelector } from 'react-redux';
import NoUnitsText from '../UI/Unit/NoUnitsText';
import Units from '../UI/Unit/Units';

const FavouriteUnits = () => {
	const units = useSelector((state) => state.unit.favouriteUnits) || [];

	return (
		<div>
			{units.length === 0 ? (
				<NoUnitsText
					text={'You have not added any units to favourites.'}
					linkText={'Add one!'}
					link={'/'}
				/>
			) : (
				<Units
					units={units}
					errorText={"You haven't liked any unit yet"}
				/>
			)}
		</div>
	);
};

export default FavouriteUnits;
