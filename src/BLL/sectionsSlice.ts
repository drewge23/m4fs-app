import {createSlice} from "@reduxjs/toolkit";

//a slice to store current grade sections names
//do I need it?
const sectionsSlice = createSlice({
    name: 'sections',
    initialState: [],
    reducers: {
        setSections: (state, action) => {
            //get current grade section names from thunk
        }
    }
})
//TODO: rename thunks
export const getSections = (gradeNum: number) => (dispatch: any) => {
    //db request
}