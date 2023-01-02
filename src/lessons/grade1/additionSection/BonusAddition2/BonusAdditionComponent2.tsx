import React from "react";

export const generateBonusAddition = () => {
    let a = Math.ceil(Math.random() * 10_000);
    let b = Math.ceil(Math.random() * 10_000);
    return {
        coefs: [a.toString(), b.toString()],
        rightAnswers: [(a + b).toString()]
    }
}

const BonusAdditionComponent2 = ({formik, coefs}: any) => {
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
        </div>
    )
}

export default BonusAdditionComponent2;