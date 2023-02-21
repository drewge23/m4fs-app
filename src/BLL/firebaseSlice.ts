import {createSlice} from "@reduxjs/toolkit";

const firebaseSlice = createSlice({
    name: 'firebase',
    initialState: {
        app: null,
        db: null,
        user: null,
    },
    reducers: {
        setApp: (state, action) => {
            state.app = action.payload
            return state
        },
        setDB: (state, action) => {
            state.db = action.payload
            return state
        },
        setUser: (state, action) => {
            state.user = action.payload
            return state
        }
    }
})

export default firebaseSlice.reducer
export const {setApp,setDB, setUser} = firebaseSlice.actions