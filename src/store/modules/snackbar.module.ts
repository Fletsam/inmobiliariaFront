import { defaultAlertValue } from '@/interfaces/snackbar.interface';
import { createSlice } from '@reduxjs/toolkit';

export const snackbarSlice = createSlice({
	name: 'utils',
	initialState: defaultAlertValue,
	reducers: {
		setAlert: (state, action) => ({ ...state, ...action.payload }),
	},
});

export const { setAlert } = snackbarSlice.actions;

export default snackbarSlice.reducer;
