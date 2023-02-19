import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    lessonsTotal: 0,
    bonusLessonsTotal: 0,
    sectionsTotal: 0,
}

let globalProgressSlice = createSlice({
    name: 'globalProgress',
    initialState: initialState,
    reducers: {
        incrementLessonsTotal: (state: any) => {
            state.lessonsTotal++;
            return state;
        },
        incrementBonusLessonsTotal: (state: any) => {
            state.bonusLessonsTotal++;
            return state;
        },
        incrementSectionsTotal: (state: any) => {
            state.sectionsTotal++;
            return state;
        },
    }
})

export default globalProgressSlice.reducer;
export const {
    incrementLessonsTotal,
    incrementBonusLessonsTotal,
    incrementSectionsTotal
} = globalProgressSlice.actions;