import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as HeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as HeartOutline } from '@fortawesome/free-regular-svg-icons';
import useCreator from '../../hooks/use-creator';

import classes from './Heart.module.css';
import { fetchFavouriteUnits } from '../../store/unit-actions';

const Heart = ({ unit }) => {
	const favUnits = useSelector((state) => state.unit.favouriteUnits);
	const isCreator = useCreator(unit.creator);
	const token = useSelector((state) => state.auth.token);
	const dispatch = useDispatch();

	const [popularity, setPopularity] = useState(unit.popularity);
	const [isFill, setIsFill] = useState(false);

	useEffect(() => {
		favUnits.map((item) => {
			if (item._id === unit._id) {
				setIsFill(true);
			}
			return item;
		});
	}, [favUnits, unit, token]);

	const fetchFavUnits = async () => {
		await dispatch(fetchFavouriteUnits(token));
	};

	const toggleToFavHandler = () => {
		if (isCreator) {
			console.log("Can't add own units to favourite");
			return;
		}
		if (isFill) {
			fetchRequest(
				'DELETE',
				token,
				unit._id,
				setPopularity,
				setIsFill,
				fetchFavUnits
			);
		} else {
			fetchRequest(
				'POST',
				token,
				unit._id,
				setPopularity,
				setIsFill,
				fetchFavUnits
			);
		}
	};

	return (
		<p className={isCreator ? '' : classes.heart}>
			<FontAwesomeIcon
				onClick={toggleToFavHandler}
				icon={
					isCreator ? HeartSolid : isFill ? HeartSolid : HeartOutline
				}
				color={'var(--orange)'}
			/>
			{` ${popularity}`}
		</p>
	);
};

export default Heart;

const fetchRequest = async (
	method,
	token,
	unitId,
	setPopularity,
	setIsFill,
	fetchFavUnits
) => {
	const url = `${process.env.REACT_APP_BACKENDURL}/favourites/${unitId}`;
	const response = await fetch(url, {
		method: method,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const data = await response.json();

	if (data.status === 200) {
		setPopularity(data.unit.popularity);
		if (method === 'DELETE') {
			console.log('usuwam');
			setIsFill(false);
		} else if (method === 'POST') {
			setIsFill(true);
		}
		fetchFavUnits();
	}
};
