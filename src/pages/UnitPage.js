import React from 'react';
import { Route } from 'react-router-dom';
import UnitNavigation from '../components/UnitPage/UnitNavigation';
import AddUnit from '../components/UnitPage/AddUnit';

const unitNavigationParams = {
	yourUnits: {
		title: 'Your Units',
		text: 'Here you can edit or play your own units',
		yourUnits: false,
		addUnit: true,
		favouriteUnits: true,
	},
	addUnit: {
		title: 'Add Unit',
		text: 'Here you can add new unit',
		yourUnits: true,
		addUnit: false,
		favouriteUnits: true,
	},
	favouriteUnits: {
		title: 'Your favourites Units',
		text: 'Here you can play your favourites units',
		yourUnits: true,
		addUnit: true,
		favouriteUnits: false,
	},
};

const UnitPage = () => {
	return (
		<>
			<Route path="/units" exact>
				<UnitNavigation {...unitNavigationParams.yourUnits} />
				{/* <Units /> */}
			</Route>
			<Route path="/units/add" exact>
				<UnitNavigation {...unitNavigationParams.addUnit} />
				<AddUnit />
			</Route>
			<Route path="/units/favourite" exact>
				<UnitNavigation {...unitNavigationParams.favouriteUnits} />
				{/* <favouriteUnits /> */}
			</Route>
		</>
	);
};

export default UnitPage;
