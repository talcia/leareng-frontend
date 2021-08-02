import { authActions } from './auth-slice';
import jwt from 'jwt-decode';

export const signupUser = (userData) => {
	return async () => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/auth/signup`;
			await sendRequest(url, userData);
		} catch (err) {
			throw err;
		}
	};
};

export const loginUser = (userData) => {
	return async (dispatch) => {
		try {
			const url = `${process.env.REACT_APP_BACKENDURL}/auth/login`;
			const data = await sendRequest(url, userData);
			const user = jwt(data.token);
			dispatch(authActions.login({ token: data.token, user }));
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

const sendRequest = async (url, userData) => {
	const response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(userData),
		headers: {
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();
	if (data.status === 422) {
		throw new Error('Provided email or password is invalid');
	}
	if (data.status === 409) {
		throw new Error(data.message);
	}
	if (response.status !== 200 && response.status !== 201) {
		throw new Error('Something went wrong');
	}
	return data;
};
