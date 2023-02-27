import {combineReducers, configureStore} from "@reduxjs/toolkit";
import progressReducer from "../progressSlice";
import currentLessonReducer from "../currentLessonSlice";
import { enableMapSet } from 'immer';
import moneyReducer from "../moneySlice";
import gradeReducer from "../gradeSlice";
import statistics from "../statisticsSlice";
import firebaseReducer from "../firebaseSlice";
import userDataReducer from "../userDataSlice";
import streakReducer from "../streakSlice";

enableMapSet()

const rootReducer = combineReducers({
    currentLesson: currentLessonReducer,
    progress: progressReducer,
    statistics: statistics,
    money: moneyReducer,
    grade: gradeReducer,
    firebase: firebaseReducer,
    userData: userDataReducer,
    streak: streakReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;