import {createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../api/api";

const userSlice = createSlice({
    name: "user",
    initialState: {
        login: null,
        email: null,
        id: null,
        isAuth: false,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state = action.payload;
            return state;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
            return state;
        },
    }
})

export const auth:any = () => (dispatch: any) => {
    authAPI.me()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserInfo(data.data))
                dispatch(setIsAuth(true))
            }
        })
}
export const login:any = (email: string, password: string, rememberMe = false) => (dispatch: any) => {
    authAPI.login(email, password, rememberMe)
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(auth())
            }
        })
}
export const logout:any = () => (dispatch: any) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserInfo({
                    login: null,
                    email: null,
                    id: null,
                }))
                dispatch(setIsAuth(false))
            }
        })
}

export default userSlice.reducer;
export const {setUserInfo, setIsAuth} = userSlice.actions;