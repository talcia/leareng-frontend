import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UnitNavigation from '../../components/Unit/UnitNavigation';
import AddUnit from '../../components/Unit/AddUnit';
import OwnUnits from '../../components/Unit/OwnUnits';
import FavouriteUnits from '../../components/Unit/FavouriteUnits';
import UnitsDetailsPage from './UnitsDetailsPage';
import EditUnit from '../../components/Unit/UnitDetalis/EditUnit';

const unitNavigationParams = {
	yourUnits: {
		title: 'Your Units',
		text: 'Here you can edit or play your own units',
	},
	addUnit: {
		title: 'Add Unit',
		text: 'Here you can add new unit',
	},
	editUnit: {
		title: 'Edit Unit',
		text: 'Here you change details of your unit',
	},
	favouriteUnits: {
		title: 'Your favourites Units',
		text: 'Here you can play your favourites units',
	},
	detailsUnit: {
		title: 'Unit details',
		text: 'Here you can check details of unit especially words',
	},
};

const Unit = () => {
	return (
		<Switch>
			<Route path="/units" exact>
				<UnitNavigation {...unitNavigationParams.yourUnits} />
				<OwnUnits />
			</Route>
			<Route path="/units/add" exact>
				<UnitNavigation {...unitNavigationParams.addUnit} />
				<AddUnit />
			</Route>
			<Route path="/units/edit/:unitId" exact>
				<UnitNavigation {...unitNavigationParams.editUnit} />
				<EditUnit />
			</Route>
			<Route path="/units/favourite" exact>
				<UnitNavigation {...unitNavigationParams.favouriteUnits} />
				<FavouriteUnits />
			</Route>
			<Route path="/units/:unitId" exact>
				<UnitNavigation {...unitNavigationParams.detailsUnit} />
				<UnitsDetailsPage />
			</Route>
		</Switch>
	);
};

export default Unit;
