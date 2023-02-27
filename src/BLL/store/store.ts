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
import starsReducer from "../starsSlice";

enableMapSet()

const rootReducer = combineReducers({
    currentLesson: currentLessonReducer,
    progress: progressReducer,
    statistics: statistics,
    grade: gradeReducer,
    firebase: firebaseReducer,
    userData: userDataReducer,
    streak: streakReducer,
    stars: starsReducer,
    money: moneyReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;