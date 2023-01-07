import React from "react";

export const generateBonusQuadraticD1 = () => {
    const MAXQUAD = 21;
    let quadArr = [];
    for (let i = 0; i < MAXQUAD; i++) {
        quadArr[i] = i**2
    }

    let a = Math.ceil(Math.random() * 10) - 5 || 1;

    let bcArr = [[0, 0]];
    for (let b = -20; b < 20; b = b + 2) {
        // D = b^2 - 4ac
        // sqrt(b^2 - 4ac) == integer
        // c = (integer^2 - b^2) / -4a
        let c = (quadArr[Math.floor(Math.random() * MAXQUAD)] - b**2) / -4 / a;
        if ( c % 1 === 0) {
            bcArr.push([b, c])
        }
    }
    let [b, c] = bcArr[Math.ceil(Math.random() * (bcArr.length - 1 ))];

    let D = 0.25 * b**2 - a * c;
    let sqrtD = Math.sqrt(D);
    let x1: any = (-b + sqrtD) / 2 / a;
    let x2: any = (-b - sqrtD) / 2 / a;
    if ( (x1 * 100) % 1 !== 0) { x1 = x1.toFixed(2)}
    if ( (x2 * 100) % 1 !== 0) { x2 = x2.toFixed(2)}

    return {
        coefs: [a, b, c].map(i => i.toString()),
        rightAnswers: [a, b, c, D, sqrtD, x1, x2].map(i => i.toString())
    }
}
//&#178;
const BonusQuadraticD1Component = ({formik, coefs}: any) => {
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
        <label htmlFor="answers[3]"><span> {'D = '} </span></label>
            <input
                id="answers[3]"
                name="answers[3]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[3]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[3]} </div> : <div></div>}
        <label htmlFor="answers[4]"><span> {'square root of D = '} </span></label>
            <input
                id="answers[4]"
                name="answers[4]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[4]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[4]} </div> : <div></div>}
        <label htmlFor="answers[5]"><span> {'x'}<sub>1</sub>{' = '} </span></label>
            <input
                id="answers[5]"
                name="answers[5]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[5]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[5]} </div> : <div></div>}
        <label htmlFor="answers[6]"><span> {'x'}<sub>2</sub>{' = '} </span></label>
            <input
                id="answers[6]"
                name="answers[6]"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.answers[6]}
            />
            {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[6]} </div> : <div></div>}
        </div>
    )
}

export default BonusQuadraticD1Component;