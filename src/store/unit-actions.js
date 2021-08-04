import { unitActions } from './unit-slice';
import jwt from 'jwt-decode';

export const addUnit = (unitData, token) => {
	return async (dispatch) => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/units`;
			const data = await sendRequest(url, {
				method: 'POST',
				data: unitData,
				token,
			});
			const { createdAt, updatedAt, ...unit } = data.unit;
			dispatch(unitActions.addUnit({ unit }));
		} catch (err) {
			throw err;
		}
	};
};

export const deleteUnit = (unitId, token) => {
	return async (dispatch) => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/units/${unitId}`;
			await sendRequest(url, {
				method: 'DELETE',
				token,
			});
			dispatch(unitActions.removeUnit({ unitId }));
		} catch (err) {
			throw err;
		}
	};
};

export const fetchOwnUnits = (token) => {
	return async (dispatch) => {
		try {
			const user = jwt(token);
			const url = `${process.env.REACT_APP_BACKENDURL}/users/${user.userId}/units`;
			console.log(url);
			const data = await sendRequest(url, {
				method: 'GET',
				token,
			});
			const units = data.user.units;
			dispatch(unitActions.fetchUnit({ units }));
		} catch (err) {
			throw err;
		}
	};
};

export const fetchFavouriteUnits = (token) => {
	return async (dispatch) => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/favourites`;
			const data = await sendRequest(url, {
				method: 'GET',
				token,
			});
			const units = data.user.favouritesUnits;
			dispatch(unitActions.fetchFavouriteUnit({ units }));
		} catch (err) {
			throw err;
		}
	};
};

const sendRequest = async (url, requestObject) => {
	const response = await fetch(url, {
		method: requestObject.method,
		body: JSON.stringify(requestObject.data),
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${requestObject.token}`,
		},
	});
	const data = await response.json();
	if (data.status === 422) {
		throw new Error('Provided email or password is invalid');
	}
	if (data.status === 401) {
		throw new Error(
			'Please confirm your email address if you want to add units'
		);
	}
	if (response.status !== 200 && response.status !== 201) {
		throw new Error('Something went wrong');
	}
	return data;
};
