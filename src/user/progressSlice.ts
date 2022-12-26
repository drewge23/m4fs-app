import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    [
        [0, 0, false, false, false],
        [0, 0, false, false, false],
    ],
    [
        [0, 0, false, false, false]
    ]
]

let progressSlice = createSlice({
    name: 'progress',
    initialState: initialState,
    reducers: {
        incrementLessonProgress: (state, action) => {
            // @ts-ignore
            state[action.payload.grade][action.payload.section][0]++;
            return state;
        },
        incrementBonusProgress: (state, action) => {
            // @ts-ignore
            state[action.payload.grade][action.payload.section][1]++;
            return state;
        },
        testCompleted: (state, action) => {
            // @ts-ignore
            state[action.payload.grade][action.payload.section][2] = true;
            return state;
        },
        lessonsCompleted: (state, action) => {
            // @ts-ignore
            state[action.payload.grade][action.payload.section][3] = true;
            return state;
        },
        bonusCompleted: (state, action) => {
            // @ts-ignore
            state[action.payload.grade][action.payload.section][4] = true;
            return state;
        },
    }
})

export default progressSlice.reducer;
export const {
                incrementLessonProgress,
                incrementBonusProgress,
                lessonsCompleted,
                bonusCompleted,
                testCompleted
             } = progressSlice.actions;