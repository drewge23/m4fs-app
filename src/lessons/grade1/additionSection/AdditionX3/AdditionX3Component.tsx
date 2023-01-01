import React from "react";

export const generateAddition = () => {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    return {
        coefs: [a.toString(), b.toString()],
        rightAnswers: [(a + b).toString(), (a + b).toString(), (a + b).toString()]
    }
}

const AdditionX3Component = ({formik, coefs}: any) => {
    return (
        <div>
            <label htmlFor="answers[0]"><span> {coefs[0]} </span> {'+'} <span> {coefs[1]} </span> {'='}</label>
            <input
                id="answers[0]"
                name="answers[0]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[0]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[0]} </div> : <div></div>}
            <label htmlFor="answers[1]"><span> {coefs[0]} </span> {'+'} <span> {coefs[1]} </span> {'='}</label>
            <input
                id="answers[1]"
                name="answers[1]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[1]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[1]} </div> : <div></div>}
            <label htmlFor="answers[2]"><span> {coefs[0]} </span> {'+'} <span> {coefs[1]} </span> {'='}</label>
            <input
                id="answers[2]"
                name="answers[2]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[2]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[2]} </div> : <div></div>}
        </div>
    )
}

export default AdditionX3Component;