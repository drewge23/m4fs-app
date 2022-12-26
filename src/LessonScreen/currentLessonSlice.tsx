import {createSlice} from "@reduxjs/toolkit";
import {generateAddition} from "../lessons/grade1/additionSection/Addition/AdditionComponent";

const InitialComponent = () => {
    return <div> nothing yet </div>;
}

const initialFunction = () => {
    // return generateAddition()
    return {coefs: [], rightAnswers: []}
}

let currentLessonSlice = createSlice({
    name: 'currentLesson',
    initialState: {
        id: 0,
        name: '',
        component: InitialComponent,
        generateFunction: initialFunction,
        reward: 1,
        isCompleted: false,
        isBonus: false,
        description: '',
        theory: '',
        isFetching: false,
    },
    reducers: {
        setLessonState: (state, action) => {
            state.component = action.payload.component
            state.generateFunction = action.payload.generateFunction
            state.name = action.payload.name
        },
        setIsFetching: (state, action) => {
            state.isFetching = action.payload
        },
    }
})

export const setLessonStateThunk = (lessonPath: any) => (dispatch: any) => {
    setIsFetching(true)
    import("../lessons/grade1/additionSection/Addition/AdditionComponent").then(response => {
            setLessonState(response)
            setIsFetching(false)
        }
    )
}

export default currentLessonSlice.reducer;
export const {setLessonState, setIsFetching} = currentLessonSlice.actions;