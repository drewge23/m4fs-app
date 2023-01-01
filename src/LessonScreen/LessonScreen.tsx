import React, {FC, LazyExoticComponent, Suspense, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useFormik} from "formik";
import AdditionComponent, {generateAddition} from "../lessons/grade1/additionSection/Addition/AdditionComponent";
import {useDispatch, useSelector} from "react-redux";
import {setLessonStateThunk} from "./currentLessonSlice";
import {incrementLessonProgress} from "../user/progressSlice";

const LessonScreen: FC = (props: any) => {
    const location = useLocation();
    let {id, grade, sectionName, sectionProgress, lessonIndex} = location.state;

    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (progress >= 100) {
            onCompletion(grade, sectionName, sectionProgress, lessonIndex)
        }
    }, [progress])

    function onCompletion(grade: number, sectionName: string, sectionProgress: number, lessonIndex: number) {
        if (lessonIndex >= sectionProgress) {
            dispatch(incrementLessonProgress({grade: grade - 1, section: sectionName}))
        }
        alert('good job!');
        navigate('/');
        setProgress(0);
    }

    let Lesson = AdditionComponent;
    let generateFunction = generateAddition;

    const dispatch = useDispatch();
    let isFetching = useSelector((state: any) => state.currentLesson.isFetching)
    let path = '../lessons/grade1/additionSection/Addition/AdditionComponent'
    useEffect(() => {
        // @ts-ignore
        dispatch(setLessonStateThunk(path))
    }, [dispatch])

    // let Lesson = useSelector((state: any) => state.currentLesson.component);
    // let generateFunction = useSelector((state: any) => state.currentLesson.generateFunction);
    const [{coefs, rightAnswers}, generateCoefs] = useState(generateFunction()); //? useEffect [generateFunc]?

    interface Errors {
        answers: string[];
    }

    let initialAnswers: string[] = [];
    for (let i = 0; i < rightAnswers.length; i++) {
        initialAnswers.push('');
    }

    const formik = useFormik({
        initialValues: {answers: initialAnswers},
        onSubmit: (values, {resetForm}) => {
            alert(JSON.stringify(values, null, 2));
            setProgress(progress + 50)
            generateCoefs(generateFunction());
            resetForm();
        },
        validate: (values) => {
            const errors: Errors = {answers: []};
            // for (let i = 0; i < rightAnswers.length; i++) {
            //     errors.answers?.push('');
            // }
            for (let i = 0; i < rightAnswers.length; i++) {
                if (values.answers[i] !== rightAnswers[i]) {
                    errors.answers[i] = '❌'
                    console.log(errors.answers[i])
                }
            }
            return errors.answers.length === 0 ? {} : errors;
        },
        validateOnBlur: false,
        validateOnChange: false,
    });

    // isLoaded ?
    return (
        <div>
            <h1>Lesson</h1>
            <button onClick={() => alert('here goes the Theory section')}>Theory</button>
            <NavLink to={"/"}>
                <button>Exit</button>
            </NavLink>
            <LinearProgress variant="determinate" value={progress}/>
            <form onSubmit={formik.handleSubmit}>
                <Lesson formik={formik} coefs={coefs}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
    // : <div> loading . . . </div>
}

export default LessonScreen;