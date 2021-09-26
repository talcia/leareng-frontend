import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import unitSlice from './unit-slice';
import themeSlice from './theme-slice';

const store = configureStore({
	reducer: { auth: authSlice, unit: unitSlice, theme: themeSlice },
});

export default store;
