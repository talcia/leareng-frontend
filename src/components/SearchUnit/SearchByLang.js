import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TitleText from '../../components/UI/TitleText';
import Units from '../UI/Unit/Units';
import NoUnitsText from '../UI/Unit/NoUnitsText';
import SearchBar from '../UI/SearchBar';
import useInput from '../../hooks/use-input';

import classes from './SearchByLang.module.css';
import Button from '../UI/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { sendRequest } from '../../utils/sendRequest';
import { useSelector } from 'react-redux';

const SearchByLang = () => {
	const [units, setUnits] = useState([]);
	const [fromLang, setFromLang] = useState('');
	const [toLang, setToLang] = useState('');
	const [searched, setSearched] = useState(false);
	const token = useSelector((state) => state.auth.token);

	const onChange = (e, langSetter) => {
		const value = e.target.value.toUpperCase();
		langSetter(value);
	};

	const requestObject = { method: 'GET', token };
	const errorMessage = {
		404: 'Could not find units for this key word',
	};

	const onSubmitHandler = async (e) => {
		e.preventDefault();
		if (!fromLang && !toLang) {
			return;
		}

		const url = `${process.env.REACT_APP_BACKENDURL}/units/${fromLang}/${toLang}`;

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
				title="Search units by language"
				text={
					<>
						You can also search by{' '}
						<Link to="/units/search/word">key words</Link>
					</>
				}
			/>
			<form onSubmit={onSubmitHandler} className={classes.searchLang}>
				<p>From</p>{' '}
				<SearchBar
					placeholder="language"
					value={fromLang}
					onChange={(e) => onChange(e, setFromLang)}
					errorText={'Must not be empty'}
				/>{' '}
				<p>to</p>{' '}
				<SearchBar
					placeholder="language"
					value={toLang}
					onChange={(e) => onChange(e, setToLang)}
					errorText={'Must not be empty'}
				/>{' '}
				<Button
					text={<FontAwesomeIcon icon={faSearch} />}
					type="submit"
				/>
			</form>
			{searched && !units.length ? (
				<NoUnitsText text={"Can't find anything"} />
			) : (
				<Units units={units} />
			)}
		</div>
	);
};

export default SearchByLang;
