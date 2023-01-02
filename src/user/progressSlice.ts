import {createSlice} from "@reduxjs/toolkit";

const grade1 = new Map([
    ["addition", [0, 0, false, false, false]],
    ["subtraction", [0, 0, false, false, false]],
])

const grade2 = new Map([
    ["quadratic", [0, 0, false, false, false]],
])

const initialState = [
    grade1,
    grade2,
]

let progressSlice = createSlice({
    name: 'progress',
    initialState: initialState,
    reducers: {
        incrementLessonProgress: (state: any, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            state[grade].get(section)[0]++;
            return state;
        },
        incrementBonusProgress: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade].get(section)[1]++;
            return state;
        },
        testCompleted: (state, action) => {
            // @ts-ignore
            state[action.payload.grade][action.payload.section][2] = true;
            return state;
        },
        lessonsCompleted: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade].get(section)[3] = true;
            return state;
        },
        bonusLessonsCompleted: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade].get(section)[4] = true;
            return state;
        },
    }
})

export default progressSlice.reducer;
export const {
    incrementLessonProgress,
    incrementBonusProgress,
    lessonsCompleted,
    bonusLessonsCompleted,
    testCompleted
} = progressSlice.actions;