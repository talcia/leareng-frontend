import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchByWord from '../../components/SearchUnit/SearchByWord';
import SearchByLang from '../../components/SearchUnit/SearchByLang';

const SearchPage = () => {
	return (
		<div>
			<Switch>
				<Route path="/units/search/word" exact>
					<SearchByWord />
				</Route>
				<Route path="/units/search/lang" exact>
					<SearchByLang />
				</Route>
			</Switch>
		</div>
	);
};

export default SearchPage;
