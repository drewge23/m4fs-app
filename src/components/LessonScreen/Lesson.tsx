import React from 'react';
import s from './lessonScreen.module.css'

function Lesson({formik, task, subtasks, pic}: any) {
    return (
        <div className={s.lesson}>
            <h2 className={s.task}>{task}</h2>
            <div className={s.subtasks}>
                {subtasks.map((item: any, index: number) => (
                    <div key={index} className={s.subtask}>
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