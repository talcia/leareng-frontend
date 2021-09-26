import { themeActions } from './theme-slice';

export const changeToDarkMode = () => {
	return async (dispatch) => {
		try {
			dispatch(themeActions.changeToDarkMode());
		} catch (err) {
			throw err;
		}
	};
};

export const changeToLightMode = () => {
	return async (dispatch) => {
		try {
			dispatch(themeActions.changeToLightMode());
		} catch (err) {
			throw err;
		}
	};
};
