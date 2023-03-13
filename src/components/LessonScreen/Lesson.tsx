import { nanoid } from '@reduxjs/toolkit';
import React, {useEffect, useRef} from 'react';
import s from './lessonScreen.module.css'

function Lesson({formik, task, subtasks, pic, isCorrect}: any) {
    return (
        <div className={s.lesson}>
            <h2 className={s.task}>{task}</h2>
            <div className={s.subtasks}>
                {subtasks.map((item: any, index: number) => (
                    <div key={index} className={s.subtask}>
                        <label htmlFor={`answers[${index}]`}><span> {item + ' = '} </span></label>
                        <input
                            autoFocus={index === 0}
                            key={Number(isCorrect)}

                            disabled={isCorrect}
                            id={`answers[${index}]`}
                            name={`answers[${index}]`}
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.answers[index]}
                            style={
                                isCorrect
                                    ? {borderColor: '#13b804'}
                                    : formik.touched.answers && formik.errors.answers &&
                                    formik.touched.answers[index] && formik.errors.answers[index]
                                    && {borderColor: '#e23e31'}
                            }
                        />
                        {/*{formik.touched.answers && formik.errors.answers*/}
                        {/*    && <div> {formik.errors.answers[index]} </div>}*/}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Lesson;