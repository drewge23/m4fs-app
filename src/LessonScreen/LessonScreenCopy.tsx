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
import Lesson from "./Lesson";
import LessonForm from "./LessonForm";

// @ts-ignore
const LessonScreen: FC = (props) => {
    const dispatch = useDispatch()
    const tasks = useSelector((state: any) => state.currentLesson.tasks)
    useEffect(() => {
        // @ts-ignore
        dispatch(setLessonStateThunk('tzrbV5ACde0McGaOkklp'))
    }, [])

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState(0)

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
        if (progress > 0 ) setCurrentTask(currentTask + 1);
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
    let lesson = isBonus
        ? section?.bonusLessons.find((lesson: any) => lesson.id === id)
        : section?.lessons.find((lesson: any) => lesson.id === id)
    let theory = lesson?.theory || 'theory sector is not yet ready for this lesson'
    let reward = lesson?.reward || 1

    const [lives, setLives] = useState([1, 1, 1]);
    const loseTest = () => {
        alert("nice try anyway! here's something for going this far")
        dispatch(earn(1));
        navigate('/');
        setProgress(0);
    }

    const lessonFormProps = {tasks, currentTask, setProgress, progress, isTest, setLives, lives, loseTest}

    return <>
        {tasks
            ? <div>
                <h1>Lesson</h1>
                {!isTest && <button onClick={() => alert(theory)}>Theory</button>}
                <NavLink to={"/"}>
                    <button>Exit</button>
                </NavLink>
                <LinearProgress variant="determinate" value={progress}/>
                {isTest ? <div> {lives.map((life: any, index) => <span key={index}> 💗 </span>)} </div> : null}
                {tasks && <LessonForm {...lessonFormProps}/>}
            </div>
            : <div> Loading . . .</div>
        }
    </>
}

export default LessonScreen;