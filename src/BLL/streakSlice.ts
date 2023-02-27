import {createSlice} from "@reduxjs/toolkit";
import {initialStreak} from "./initialStreak";

const streakSlice = createSlice({
    name: 'streak',
    initialState: initialStreak,
    reducers: {
        setStreak: (state, action) => {
            state.streak = action.payload.streak
            state.streakIsIncrementable = action.payload.streakIsIncrementable
            // state.streakDeadline = action.payload.streakIsIncrementable
            //     ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
            //     : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)
            state.streakDeadline = new Date(Date.parse(action.payload.streakDeadline))
            state.streakUpdateTime = new Date(Date.parse(action.payload.streakUpdateTime))
            return state
        },
        incrementStreak: (state) => {
            state.streak++
            state.streakUpdateTime = new Date()
            state.streakDeadline = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)
            return
        },
        resetStreak: (state) => {
            state.streak = 0
            return state
        },
        setStreakIsIncrementable: (state, action) => {
            state.streakIsIncrementable = action.payload
            return state
        }
    }
})

// export const getStreakThunk = (db: any, uid: string) => (dispatch: any) => {
//     db.collection("users").doc(uid).get()
//         .then((response: any) => {
//                 if (response.exists) {
//                     dispatch(setStreak(JSON.parse(response.data().streak)))
//                 }
//             }
//         )
// }

export default streakSlice.reducer
export const {incrementStreak, resetStreak, setStreakIsIncrementable, setStreak} = streakSlice.actions