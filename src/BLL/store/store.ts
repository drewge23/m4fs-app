import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userReducer from "../junk/userSlice";
import progressReducer from "../progressSlice";
import currentLessonReducer from "../currentLessonSlice";
import { enableMapSet } from 'immer';
import moneyReducer from "../moneySlice";
import gradeReducer from "../gradeSlice";
import statistics from "../statisticsSlice";
import firebaseReducer from "../firebaseSlice";
import userDataSlice from "../userDataSlice";

enableMapSet()

const rootReducer = combineReducers({
    user: userReducer,
    currentLesson: currentLessonReducer,
    progress: progressReducer,
    statistics: statistics,
    money: moneyReducer,
    grade: gradeReducer,
    firebase: firebaseReducer,
    userData: userDataSlice,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;