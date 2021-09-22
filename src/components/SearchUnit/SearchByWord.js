import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TitleText from '../../components/UI/TitleText';
import Units from '../UI/Unit/Units';
import NoUnitsText from '../UI/Unit/NoUnitsText';
import SearchBar from '../UI/SearchBar';

import { sendRequest } from '../../utils/sendRequest';
import { useSelector } from 'react-redux';

const SearchByWord = () => {
	const [units, setUnits] = useState([]);
	const [searched, setSearched] = useState(false);
	const [keyWord, setKeyWord] = useState('');
	const token = useSelector((state) => state.auth.token);

	const requestObject = { method: 'GET', token };
	const errorMessage = {
		404: 'Could not find units for this key word',
	};

	const onChangeHandler = async (e) => {
		const word = e.target.value;

		if (!word) {
			setUnits([]);
			setKeyWord('');
			return;
		}

		setKeyWord(word);

		const url = `${process.env.REACT_APP_BACKENDURL}/units/search/${word}`;

		try {
			const { units } = await sendRequest(
				url,
				requestObject,
				errorMessage
			);
			setUnits(units);
			setSearched(true);
		} catch (err) {
			setUnits([]);
		}
	};

	return (
		<div>
			<TitleText
				title="Search units by key words"
				text={
					<>
						You can also search{' '}
						<Link to="/units/search/lang">by language</Link>
					</>
				}
			/>
			<SearchBar
				placeholder="search"
				value={keyWord}
				onChange={onChangeHandler}
				errorText={'Must not be empty'}
			/>
			{searched && !units.length ? (
				<NoUnitsText text={"Can't find anything"} />
			) : (
				<Units units={units} />
			)}
		</div>
	);
};

export default SearchByWord;
