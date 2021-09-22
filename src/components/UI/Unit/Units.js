import React from 'react';
import Unit from './Unit';

import classes from './Units.module.css';

const Units = ({ units }) => {
	return (
		<div className={classes.unitsWrapper}>
			<ul className={classes.units}>
				{units.map((unit) => (
					<Unit unit={unit} key={unit._id} />
				))}
			</ul>
		</div>
	);
};

export default Units;
