import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "../user/userSlice";
import currentLessonReducer from "../LessonScreen/currentLessonSlice";

const rootReducer = combineReducers({
    user: userReducer,
    currentLesson: currentLessonReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;