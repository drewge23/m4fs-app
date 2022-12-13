import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profileReducer from "../Profile/profileSlice";
import userReducer from "../user/userSlice";

const rootReducer = combineReducers({
    profile: profileReducer,
    user: userReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export default store;