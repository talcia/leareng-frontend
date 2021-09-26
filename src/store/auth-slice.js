import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isAuthenticated: false,
	userId: '',
	token: '',
	email: '',
	isEmailConfirmed: false,
	isBlocked: false,
	isAdmin: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.isAuthenticated = true;
			state.userId = action.payload.user.userId;
			state.token = action.payload.token;
			state.email = action.payload.user.email;
			state.isEmailConfirmed = action.payload.user.emailConfirm;
			state.isBlocked = action.payload.user.blocked;
			state.isAdmin = action.payload.user.role === '0';
			localStorage.setItem('token', action.payload.token);
		},
		logout(state) {
			state.isAuthenticated = false;
			state.userId = '';
			state.token = '';
			state.email = '';
			state.isEmailConfirmed = false;
			state.isBlocked = false;
			localStorage.removeItem('token');
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
