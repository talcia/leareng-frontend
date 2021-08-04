import React from 'react';
import { useSelector } from 'react-redux';
import Unit from './Unit';

import classes from './FavouriteUnits.module.css';

const FavouriteUnits = () => {
	const units = useSelector((state) => state.unit.favouriteUnits) || [];
	return (
		<div className={classes.unitsWrapper}>
			{units && (
				<p className={classes.errorText}>
					You haven't liked any unit yet
				</p>
			)}
			<ul className={classes.units}>
				{units.map((unit) => (
					<Unit unit={unit} />
				))}
			</ul>
		</div>
	);
};

export default FavouriteUnits;
