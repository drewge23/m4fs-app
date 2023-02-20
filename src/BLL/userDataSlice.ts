import {createSlice} from "@reduxjs/toolkit";

const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
        fullName: null,
        progress: null
    },
    reducers: {
        setUserData: (state, action) => {
            return action.payload
        }
    }
})

export const getUserDataThunk = (db: any, userId: any) => (dispatch: any) => {
    db.collection('users').doc(userId).get()
        .then((response: any) => {
            if (response.exists) {
                dispatch(setUserData(response.data()))
            }
            //TODO dispatch setProgress separately
        })
}

export const setUserDataThunk = (db: any, userId: any, userData: any) => (dispatch: any) => {
    db.collection('users').doc(userId).set(userData)
        .then(() => dispatch(setUserData(userData)))
}

export default userDataSlice.reducer
export const {setUserData} = userDataSlice.actions