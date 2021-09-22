import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../UI/Header';
import PageTitle from '../UI/PageTitle';

import classes from './UnitNavigation.module.css';

const UnitNavigation = (props) => {
	return (
		<Header className={classes.unitNav}>
			<ul>
				<li>
					<Link to="/units">My units</Link>
				</li>

				<li>
					<Link to="/units/add">Add unit</Link>
				</li>

				<li>
					<Link to="/units/favourite">Favourite units</Link>
				</li>
			</ul>
			<PageTitle title={props.title} text={props.text} />
		</Header>
	);
};

export default UnitNavigation;
