import {createSlice} from "@reduxjs/toolkit";

const InitialComponent = () => {
    return <div> nothing yet </div>;
}

const initialFunction = () => {
    // return generateAddition()
    return {coefs: [], rightAnswers: []}
}

let initialState = {
    grades: {
        grade1: {
            additionSection: {
                addition: {
                    grade: 0,
                    section: 0,
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
                }
            }
        }

    }
}

let lessonsSlice = createSlice({
    name: 'lessons',
    initialState: initialState,
    reducers: {

    }
})