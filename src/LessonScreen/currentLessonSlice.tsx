import {createSlice} from "@reduxjs/toolkit";

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

const currentLessonSlice = createSlice({
    name: 'currentLesson',
    initialState: {
        grade: 0,
        section: 0,
        id: 0,
        name: '',
        tasks: null,
        reward: 1,
        isCompleted: false,
        isBonus: false,
        description: '',
        theory: '',
        isFetching: false,
    },
    reducers: {
        setLessonState: (state, action) => {
            state.tasks = action.payload
            return state
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload
            return state
        },
    }
})

export const setLessonStateThunk = (lessonId: string) => (dispatch: any) => {
    setIsFetching(true)
    db.collection("lessons").doc(lessonId).get()
        .then( (response: any) => {
            dispatch(setLessonState(response.data().lesson_1.tasks))
            dispatch(setIsFetching(false))
        }
    )
}

export default currentLessonSlice.reducer;
export const {setLessonState, setIsFetching} = currentLessonSlice.actions;