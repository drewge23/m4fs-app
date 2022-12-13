import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";

interface User {
    firstName: string,
    lastName?: string,
    country?: string,
    email: string,
}

const userInfo: User = {
    firstName: "",
    lastName: "",
    email: "",
}

const userSlice = createSlice({
    name: "user",
    initialState: userInfo,
    reducers: {
        setUserInfo: (state, action) => {
            state = action.payload;
            return state;
        }
    }
})

export const getUser = (userId: number) => (dispatch: Function) => {
    authAPI.getUser(userId)
        .then(response => {
            if (response.data.responseCode === 0) {
                dispatch(setUserInfo(response.data))
            }
        })
}

export default userSlice.reducer;
export const {setUserInfo} = userSlice.actions;