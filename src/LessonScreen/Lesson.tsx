import React from 'react';

function Lesson({formik, task, subtasks, pic}: any) {
    return (
        <div>
            <h2>{task}</h2>
            <div>
                {subtasks.map((item: any, index: number) => (
                    <div key={index}>
                        {index + '. '}
                        <label htmlFor={`answers[${index}]`}><span> {item + ' = '} </span></label>
                        <input
                            id={`answers[${index}]`}
                            name={`answers[${index}]`}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.answers[index]}
                        />
                        {formik.touched.answers && formik.errors.answers ? <div> {formik.errors.answers[index]} </div> : <div></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Lesson;