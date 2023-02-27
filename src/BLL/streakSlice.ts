import {createSlice} from "@reduxjs/toolkit";

const streakSlice = createSlice({
    name: 'streak',
    initialState: {
        streak: 0,
        streakUpdateTime: new Date(0),
        streakDeadline: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1),
        streakIsIncrementable: false,
    },
    reducers: {
        setStreak: (state, action) => {
            state.streak = action.payload.streak
            state.streakIsIncrementable = action.payload.streakIsIncrementable
            state.streakDeadline = action.payload.streakIsIncrementable
                ? new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1)
                : new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)
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

export const getStreakThunk = (db: any, uid: string) => (dispatch: any) => {
    db.collection("users").doc(uid).get()
        .then((response: any) => {
                if (response.exists) {
                    dispatch(setStreak(JSON.parse(response.data().streak)))
                }
            }
        )
}

export default streakSlice.reducer
export const {incrementStreak, resetStreak, setStreakIsIncrementable, setStreak} = streakSlice.actions