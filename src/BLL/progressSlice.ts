import {createSlice} from "@reduxjs/toolkit";
import initialState from "./initialProgress";

import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDdSlecVhBVceLY5YD6-yQmDRhw_F6IpZo",
    authDomain: "m4fs-id.firebaseapp.com",
    projectId: "m4fs-id",
    storageBucket: "m4fs-id.appspot.com",
    messagingSenderId: "807617556673",
    appId: "1:807617556673:web:1f4b1c4653a1daf301a440",
    measurementId: "G-K46HV2C4F8"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app)

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
            state[grade].get(section)[1]++;
            return state;
        },
        testCompleted: (state, action) => {
            let grade = action.payload.grade;
            let section = action.payload.section;
            // @ts-ignore
            state[grade].get(section)[2] = true;
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
        setProgress: (state, action) => {
            return action.payload
        }
    }
})

export const getProgressThunk = (uid: string) => (dispatch: any) => {
    //TODO: configure user object to have initial progress state
    db.collection("users").doc(uid).get()
        .then((response: any) => {
            // console.log(JSON.parse(response.data().progress))
                dispatch(setProgress(JSON.parse(response.data().progress)))
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