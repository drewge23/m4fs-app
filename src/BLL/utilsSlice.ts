import {createSlice} from "@reduxjs/toolkit";

const utilsSlice = createSlice({
    name: 'utils',
    initialState: {
        snackbar: 0,
    },
    reducers: {
        snackbarOn: (state, action) => {
            state.snackbar = action.payload
            return state
        },
        snackbarOff: (state) => {
            state.snackbar = 0
            return state
        },
    }
})

export default utilsSlice.reducer
export const {snackbarOn, snackbarOff} = utilsSlice.actions