import {createSlice} from "@reduxjs/toolkit";

const gradeSlice = createSlice({
    name: "grade",
    initialState: 1,
    reducers: {
        incrementGrade: (state) => {
            if (state < 12) {
                state = state + 1;
            }
            return state;
        },
        decrementGrade: (state) => {
            if (state > 0) {
                state = state - 1;
            }
            return state;
        }
    }
})

export default gradeSlice.reducer;
export const {incrementGrade, decrementGrade} = gradeSlice.actions;