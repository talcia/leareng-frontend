import React from 'react';
import { Link } from 'react-router-dom';

import classes from './UnitNavigation.module.css';

const UnitNavigation = (props) => {
	return (
		<>
			<header className={classes.unitHeader}>
				<div className={classes.title}>
					<h1>{props.title}</h1>
					<p>{props.text}</p>
				</div>
				<ul>
					<li>
						<Link to="/units">Your units</Link>
					</li>

					<li>
						<Link to="/units/add">Add unit</Link>
					</li>

					<li>
						<Link to="/units/favourite">Favourite units</Link>
					</li>
				</ul>
			</header>
		</>
	);
};

export default UnitNavigation;
