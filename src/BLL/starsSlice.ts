import {createSlice} from "@reduxjs/toolkit";
import {setStreak} from "./streakSlice";

const starsSlice = createSlice({
    name: 'stars',
    initialState: 0,
    reducers: {
        setStars: (state, action) => action.payload,
        incrementStars: (state) => {
            return state + 1
        },
    }
})

// export const getStarsThunk = (db: any, uid: string) => (dispatch: any) => {
//     db.collection("users").doc(uid).get()
//         .then((response: any) => {
//                 if (response.exists) {
//                     dispatch(setStreak(JSON.parse(response.data().streak)))
//                 }
//             }
//         )
// }

export default starsSlice.reducer
export const {setStars, incrementStars} = starsSlice.actions