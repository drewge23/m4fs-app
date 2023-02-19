import {createSlice} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

const moneySlice = createSlice({
    name: 'money',
    initialState: 0,
    reducers: {
        earn: (state, action) => {
            return state + action.payload
        },
        spend: (state, action) => {
            if (state >= action.payload) {
                return state - action.payload
            } else {
                return state
            }
            // alert('not enough money!')
        },
    }
})

export default moneySlice.reducer
export const {earn, spend} = moneySlice.actions