import React from 'react';
import { useSelector } from 'react-redux';
import Unit from './Unit';

import classes from './Units.module.css';

const Units = () => {
	const units = useSelector((state) => state.unit.ownUnits) || [];
	return (
		<div className={classes.unitsWrapper}>
			<ul className={classes.units}>
				{!units && <p>You haven't added any unit yet</p>}
				{units.map((unit) => (
					<Unit unit={unit} key={unit._id} />
				))}
			</ul>
		</div>
	);
};

export default Units;
