import { configureStore } from '@reduxjs/toolkit';

import authSlice from './auth-slice';
import unitSlice from './unit-slice';

const store = configureStore({
	reducer: { auth: authSlice, unit: unitSlice },
});

export default store;
