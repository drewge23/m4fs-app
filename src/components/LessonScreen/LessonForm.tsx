import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import Lesson from "./Lesson";
import s from './lessonScreen.module.css'
import CorrectModal from "./CorrectModal";
import WrongModal from "./WrongModal";

function LessonForm({tasks, currentTask, setProgress, progress, isTest, setLives, lives, loseTest}: any) {

    interface Errors {
        answers: string[];
    }

    const [isCorrect, setIsCorrect] = useState(false)
    const [isWrong, setIsWrong] = useState(false)
    const [isLastLife, setIsLastLife] = useState(false)

    const MAX_ANSWERS = 20
    let initialAnswers: string[] = [];
    for (let i = 0; i < MAX_ANSWERS; i++) {
        initialAnswers.push('');
    }
    const formik = useFormik({
        initialValues: {answers: initialAnswers},
        onSubmit: (values, {resetForm}) => {
            // alert(JSON.stringify(values, null, 2));
            // resetForm();
            setIsCorrect(true)
        },
        validate: (values) => {
            const errors: Errors = {answers: []};
            // for (let i = 0; i < rightAnswers.length; i++) {
            //     errors.answers?.push('');
            // }
            let canTakeLifeOff = true;
            for (let i = 0; i < tasks[currentTask].rightAnswers.length; i++) {
                if (values.answers[i] !== tasks[currentTask].rightAnswers[i].toString()) {
                    errors.answers[i] = '❌'
                    if (isTest) {
                        if (canTakeLifeOff) {
                            setLives(lives.slice(1))
                        }
                        canTakeLifeOff = false
                    }
                    // console.log(errors.answers[i])
                }
            }
            return errors.answers.length === 0 ? {} : errors;
        },
        validateOnBlur: false,
        validateOnChange: false,
    });

    const handleContinue = () => {
        const min = Math.min(tasks.length, 4)
        setProgress(progress + 100 / min)
        formik.resetForm()
        setIsCorrect(false)
    }

    useEffect(() => {
        if (lives.length >= 3) return
        if (lives.length === 1) setIsLastLife(true)
        if (lives.length !== 0) setIsWrong(true)
    }, [lives])

    return (
        <form onSubmit={formik.handleSubmit} className={s.lessonForm}>
            <Lesson formik={formik}
                    pic={tasks[currentTask].pic}
                    task={tasks[currentTask].task}
                    subtasks={tasks[currentTask].subtasks}
                    isCorrect={isCorrect}
                    isWrong={isWrong}
            />
            <button type="submit" className={s.submitButton} disabled={isCorrect}>Submit</button>
            {isCorrect && <CorrectModal isCorrect={isCorrect} handleContinue={handleContinue}/>}
            {isWrong && <WrongModal isWrong={isWrong} setIsWrong={setIsWrong} isLastLife={isLastLife}/>}
        </form>
    );
}

export default LessonForm;