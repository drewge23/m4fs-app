import React from "react";

export const generateQuadraticCoefs = () => {
    const MAXQUAD = 21;
    let quadArr = [];
    for (let i = 0; i < MAXQUAD; i++) {
        quadArr[i] = i**2
    }

    let a = Math.ceil(Math.random() * 10) - 5 || 1;

    let bcArr = [[0, 0]];
    for (let b = -20; b < 20; b++) {
        // D = b^2 - 4ac
        // sqrt(b^2 - 4ac) == integer
        // c = (integer^2 - b^2) / -4a
        let c = (quadArr[Math.floor(Math.random() * MAXQUAD)] - b**2) / -4 / a;
        if ( c % 1 === 0) {
            bcArr.push([b, c])
        }
    }
    let [b, c] = bcArr[Math.ceil(Math.random() * (bcArr.length - 1 ))];

    return {
        coefs: [a, b, c].map(i => i.toString()),
        rightAnswers: [a, b, c].map(i => i.toString())
    }
}
//&#178;
const QuadraticCoefsComponent = ({formik, coefs}: any) => {
    return (
        <div>
            <h3>{coefs[0] + 'x² + ' + coefs[1] + 'x + ' + coefs[2] + ' = 0'}</h3>
            <label htmlFor="answers[0]"><span> {'a = '} </span></label>
            <input
                id="answers[0]"
                name="answers[0]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[0]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[0]} </div> : <div></div>}
            <label htmlFor="answers[1]"><span> {'b = '} </span></label>
            <input
                id="answers[1]"
                name="answers[1]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[1]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[1]} </div> : <div></div>}
            <label htmlFor="answers[2]"><span> {'c = '} </span></label>
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

export default QuadraticCoefsComponent;