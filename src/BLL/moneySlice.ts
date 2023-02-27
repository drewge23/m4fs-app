import {createSlice} from "@reduxjs/toolkit";

const moneySlice = createSlice({
    name: 'money',
    initialState: 0,
    reducers: {
        setMoney: (state, action) => action.payload,
        earn: (state, action) => {
            return state + action.payload
        },
        spend: (state, action) => {
            if (state >= action.payload) {
                return state - action.payload
            } else {
                return state
            }
        },
    }
})

export default moneySlice.reducer
export const {setMoney, earn, spend} = moneySlice.actions