import React, {FC, LazyExoticComponent, Suspense, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useFormik} from "formik";
import AdditionComponent, {generateAddition} from "../lessons/grade1/additionSection/Addition/AdditionComponent";
import {useDispatch, useSelector} from "react-redux";
import {setLessonStateThunk} from "./currentLessonSlice";
import {incrementBonusProgress, incrementLessonProgress, testCompleted} from "../user/progressSlice";
import {earn} from "../user/moneySlice";
import grades from "../lessons/grades";
import {incrementBonusLessonsTotal, incrementLessonsTotal} from "../user/globalProgressSlice";

const LessonScreen: FC = (props: any) => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (progress >= 100) {
            // @ts-ignore
            if (isTest && id < section.lessons.length) {
                setProgress(0)
                setId(id + 1)
            } else {
                onCompletion(grade, sectionName, sectionProgress, lessonIndex)
            }
        }
        generateCoefs(generateFunction());
    }, [progress])

    function onCompletion(grade: number, sectionName: string, sectionProgress: number, lessonIndex: number) {
        if (isTest) {
            dispatch(testCompleted({grade: grade - 1, section: sectionName}))
        } else {
            if (!lesson?.isCompleted) {
                // @ts-ignore
                lesson.isCompleted = true
                if (isBonus) {
                    dispatch(incrementBonusProgress({grade: grade - 1, section: sectionName}))
                    dispatch(incrementBonusLessonsTotal())
                } else {
                    dispatch(incrementLessonProgress({grade: grade - 1, section: sectionName}))
                    dispatch(incrementLessonsTotal())
                }
            }
        }
        isTest ? dispatch(earn(reward * 5)) : dispatch(earn(reward))
        alert('good job!');
        navigate('/');
        setProgress(0);
    }

    const location = useLocation()
    let {grade, sectionName, sectionProgress, bonusProgress, lessonIndex} = location.state;
    let isTest = location.state.isTest || false;
    let isBonus = location.state.isBonus || false;
    const [id, setId] = useState(location.state.id);

    // @ts-ignore
    let section = grades[grade - 1].lessonSections.find((section: any) => section.name === sectionName)
    // || grades[grade - 1].lessonSections.find((section: any) => section.name === 'subtraction')
    let lesson = isBonus
        ? section?.bonusLessons.find((lesson: any) => lesson.id === id)
        : section?.lessons.find((lesson: any) => lesson.id === id)
    let Lesson = lesson?.component || AdditionComponent;
    let generateFunction = lesson?.generateFunction || generateAddition;
    let theory = lesson?.theory || 'theory sector is not yet ready for this lesson'
    let reward = lesson?.reward || 1

    // let isFetching = useSelector((state: any) => state.currentLesson.isFetching)
    // let path = '../lessons/grade1/additionSection/Addition/BonusAdditionComponent2'
    // useEffect(() => {
    //     // @ts-ignore
    //     dispatch(setLessonStateThunk(path))
    // }, [dispatch])

    const dispatch = useDispatch();
    const [lives, setLives] = useState([1, 1, 1]);
    const loseTest = () => {
        alert("nice try anyway! here's something for going this far")
        dispatch(earn(1));
        navigate('/');
        setProgress(0);
    }

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
            setProgress(progress + 50) //?
            // generateCoefs(generateFunction());
            resetForm();
        },
        validate: (values) => {
            const errors: Errors = {answers: []};
            // for (let i = 0; i < rightAnswers.length; i++) {
            //     errors.answers?.push('');
            // }
            let canTakeLifeOff = true;
            for (let i = 0; i < rightAnswers.length; i++) {
                if (values.answers[i] !== rightAnswers[i]) {
                    errors.answers[i] = '❌'
                    if (isTest) {
                        if (canTakeLifeOff) {
                            setLives(lives.slice(1))
                        }
                        canTakeLifeOff = false
                    }
                    console.log(errors.answers[i])
                }
            }
            if (isTest && lives.length === 0) {
                loseTest()
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
            {!isTest ? <button onClick={() => alert(theory)}>Theory</button> : null}
            <NavLink to={"/"}>
                <button>Exit</button>
            </NavLink>
            <LinearProgress variant="determinate" value={progress}/>
            {isTest ? <div> {lives.map((life: any, index) => <span key={index}> 💗 </span>)} </div> : null}
            <form onSubmit={formik.handleSubmit}>
                <Lesson formik={formik} coefs={coefs}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
    // : <div> loading . . . </div>
}

export default LessonScreen;