import { unitActions } from './unit-slice';
import jwt from 'jwt-decode';
import { sendRequest } from '../utils/sendRequest';

export const addUnit = (unitData, token) => {
	return async (dispatch) => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/units`;
			const data = await sendReq(url, {
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
			await sendReq(url, {
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
			const data = await sendReq(url, {
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
			const data = await sendReq(url, {
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

const sendReq = async (url, requestObject) => {
	const errorMessage = {
		422: 'Provided email or password is invalid',
		401: 'Please confirm your email address if you want to add units',
	};
	const data = await sendRequest(url, requestObject, errorMessage);
	return data;
};
