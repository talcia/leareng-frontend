import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	ownUnits: [],
	favouriteUnits: [],
};

const unitSlice = createSlice({
	name: 'unit',
	initialState,
	reducers: {
		addUnit(state, action) {
			state.ownUnits.push(action.payload.unit);
		},
		fetchUnit(state, action) {
			state.ownUnits = action.payload.units || [];
		},
		fetchFavouriteUnit(state, action) {
			state.favouriteUnits = action.payload.units || [];
		},
		addUnitToFavourite(state, action) {
			state.favouriteUnits.push(action.payload.unit);
		},
		editUnit(state, action) {
			const index = state.unit.findIndex(
				(item) => item.id === action.payload.unit.id
			);
			state.unit[index] = action.payload.unit;
		},
		removeUnit(state, action) {
			state.unit = state.unit.filter(
				(item) => item.id !== action.payload.unitId
			);
		},
		removeUnitFromFavourite(state, action) {
			state.unit = state.unit.filter(
				(item) => item.id !== action.payload.unitId
			);
		},
		resetUnit(state, action) {
			state.ownUnits = [];
			state.favouriteUnits = [];
		},
	},
});

export const unitActions = unitSlice.actions;
export default unitSlice.reducer;