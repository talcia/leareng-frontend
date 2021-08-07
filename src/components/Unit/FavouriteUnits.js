import React from 'react';
import { useSelector } from 'react-redux';
import Units from '../UI/Unit/Units';

const FavouriteUnits = () => {
	const units = useSelector((state) => state.unit.favouriteUnits) || [];
	return <Units units={units} errorText={"You haven't liked any unit yet"} />;
};

export default FavouriteUnits;
