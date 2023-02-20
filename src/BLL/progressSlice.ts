import {createSlice} from "@reduxjs/toolkit";
import initialState from "./initialProgress";

const progressSlice = createSlice({
    name: 'progress',
    initialState: initialState,
    reducers: {
        incrementLessonProgress: (state: any, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            state[grade][section][0]++;
            return state;
        },
        incrementBonusProgress: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade][section][1]++;
            return state;
        },
        testCompleted: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade][section][2] = true;
            return state;
        },
        lessonsCompleted: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade][section][3] = true;
            return state;
        },
        bonusLessonsCompleted: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade][section][4] = true;
            return state;
        },
        setProgress: (state, action) => {
            return action.payload
        }
    }
})

export const getProgressThunk = (db: any, uid: string) => (dispatch: any) => {
    //TODO: configure user object to have initial progress state
    db.collection("users").doc(uid).get()
        .then((response: any) => {
                if (response.exists) {
                    dispatch(setProgress(JSON.parse(response.data().progress)))
                }
            }
        )
}

export default progressSlice.reducer;
export const {
    incrementLessonProgress,
    incrementBonusProgress,
    lessonsCompleted,
    bonusLessonsCompleted,
    testCompleted,
    setProgress
} = progressSlice.actions;