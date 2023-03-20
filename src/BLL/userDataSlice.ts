import {createSlice} from "@reduxjs/toolkit";
import {setProgress} from "./progressSlice";
import {setStars} from "./starsSlice";
import {setStreak} from "./streakSlice";
import {setMoney} from "./moneySlice";
import initialProgress from "./initialProgress";
import {initialStreak} from "./initialStreak";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        isInitialized: false,
        fullName: null,
        avatarUrl: null,
        userId: null,
    },
    reducers: {
        setUserData: (state, action) => {
            return action.payload
        },
        setUserName: (state, action) => {
            return {...state, fullName: action.payload}
        },
        setUserAvatarUrl: (state, action) => {
            return {...state, avatarUrl: action.payload}
        },
    }
})

export const getUserDataThunk = (db: any, userId: any) => (dispatch: any) => {
    db.collection('users').doc(userId).get()
        .then((response: any) => {
            if (response.exists) {
                dispatch(setProgress(JSON.parse(response.data().progress)))
                dispatch(setStreak(JSON.parse(response.data().streak)))
                dispatch(setMoney(response.data().money))
                dispatch(setStars(response.data().stars))
                dispatch(setUserData({
                    fullName: response.data().fullName,
                    avatarUrl: response.data().avatarUrl,
                    userId: response.data().userId,
                    isInitialized: true,
                }))
            }
        })
}

export const setInitialUserDataThunk = (db: any, userId: any, userData: any) => (dispatch: any) => {
    db.collection('users').doc(userId).set({
        ...userData,
        progress: JSON.stringify(initialProgress),
        streak: JSON.stringify(initialStreak),
        money: 0,
        stars: 0,
    })
        .then(() => {
            dispatch(setUserData({...userData, isInitialized: true}))
            dispatch(setProgress(initialProgress))
            dispatch(setStreak(initialStreak))
            dispatch(setMoney(0))
            dispatch(setStars(0))
        })
}

export const updateUserPersonalDataThunk = (db: any, userId: any, userData: any) => (dispatch: any) => {
    db.collection('users').doc(userId).update({
        fullName: userData.fullName,
        avatarUrl: userData.avatarUrl,
    })
        .then(() => {
            dispatch(setUserName(userData.fullName))
            dispatch(setUserAvatarUrl(userData.avatarUrl))
        })
}
export default userDataSlice.reducer
export const {setUserData, setUserName, setUserAvatarUrl} = userDataSlice.actions