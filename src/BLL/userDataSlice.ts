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
        // progress: null
    },
    reducers: {
        setUserData: (state, action) => {
            return action.payload
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

export default userDataSlice.reducer
export const {setUserData} = userDataSlice.actions