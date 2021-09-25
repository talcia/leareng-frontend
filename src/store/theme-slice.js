import { createSlice } from '@reduxjs/toolkit';
import { lightTheme, darkTheme } from '../constans/colors';

const initialState = {
	theme: lightTheme,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		changeToDarkMode(state) {
			state.theme = darkTheme;
		},
		changeToLightMode(state) {
			state.theme = lightTheme;
		},
	},
});

export const themeActions = themeSlice.actions;
export default themeSlice.reducer;
