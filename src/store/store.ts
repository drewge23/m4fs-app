import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import progressReducer from "../user/progressSlice";
import currentLessonReducer from "../LessonScreen/currentLessonSlice";
import { enableMapSet } from 'immer';
import moneyReducer from "../user/moneySlice";
import gradeReducer from "../Home/SectionList/gradeSlice";

enableMapSet()

const rootReducer = combineReducers({
    user: userReducer,
    currentLesson: currentLessonReducer,
    progress: progressReducer,
    money: moneyReducer,
    grade: gradeReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export default store;