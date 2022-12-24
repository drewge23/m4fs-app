import {Input} from "@mui/material";
import {Form, Field} from "react-final-form";
import React, {useState} from "react";

const additionGenerator = () => {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    return {
        coefs: [a, b],
        answers: [a + b]
    }
}

const Addition = ({formik}: any) => {
    const [{coefs, answers}, generateCoefs] = useState(additionGenerator());

    const onSubmit = (values: any) => {
        if (!values.answer) {
            return {answer: 'Required'}
        }
        if (Number(values.answer) !== answers[0]) {
            return {answer: 'Wrong answer'}
        }
        alert("right!");
        generateCoefs(additionGenerator());
    }

    return (
        <div>
            <label htmlFor="answers"><span> {coefs[0]} </span> {'+'} <span> {coefs[1]} </span> {'='}</label>
            <input
                id="answers[0]"
                name="answers[0]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[0]}
            />
            <input
                id="answers[1]"
                name="answers[1]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[1]}
            />
        </div>
    )
}

export default Addition;