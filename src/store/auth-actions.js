import { authActions } from './auth-slice';
import { unitActions } from './unit-slice';
import jwt from 'jwt-decode';
import { sendRequest } from '../utils/sendRequest';

export const signupUser = (userData) => {
	return async () => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/auth/signup`;
			await sendReq(url, userData);
		} catch (err) {
			throw err;
		}
	};
};

export const loginUser = (userData) => {
	return async (dispatch) => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/auth/login`;
			const data = await sendReq(url, userData);
			const user = jwt(data.token);
			dispatch(authActions.login({ token: data.token, user }));
		} catch (err) {
			throw err;
		}
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		try {
			dispatch(unitActions.resetUnit());
			dispatch(authActions.logout());
		} catch (err) {
			throw err;
		}
	};
};

export const getTokenFromLocalStorage = () => {
	return (dispatch) => {
		const storedToken = localStorage.getItem('token');
		if (storedToken) {
			const user = jwt(storedToken);
			dispatch(authActions.login({ token: storedToken, user }));
			return storedToken;
		}
	};
};

const sendReq = async (url, userData) => {
	const errorMessage = {
		422: 'Provided email or password is invalid',
		409: 'User with this email already exisits',
	};
	const requestObject = {
		method: 'POST',
		data: userData,
	};
	const data = await sendRequest(url, requestObject, errorMessage);
	return data;
};
