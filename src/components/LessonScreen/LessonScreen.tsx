import React, {FC, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setLessonStateThunk} from "../../BLL/currentLessonSlice";
import {incrementBonusProgress, incrementLessonProgress, testCompleted} from "../../BLL/progressSlice";
import {earn} from "../../BLL/moneySlice";
import {incrementBonusLessonsTotal, incrementLessonsTotal} from "../../BLL/statisticsSlice";
import LessonForm from "./LessonForm";

// @ts-ignore
const LessonScreen: FC = ({sectionName, lessonId, sectionProgress, lessonIndex, isBonus, isTest, tasks}: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const gradeNum = useSelector((state: any) => state.grade)

    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState(0)

    useEffect(() => {
        if (progress >= 100) {
            onCompletion(gradeNum, sectionName, sectionProgress, lessonIndex)
        }
        if (progress > 0) setCurrentTask(currentTask + 1);
    }, [progress])

    function onCompletion(gradeNum: number, sectionName: string, sectionProgress: number, lessonIndex: number) {
        if (sectionProgress <= lessonIndex) {
            if (isTest) {
                dispatch(testCompleted({grade: gradeNum - 1, section: sectionName}))
            } else {
                if (isBonus) {
                    dispatch(incrementBonusProgress({grade: gradeNum - 1, section: sectionName}))
                    dispatch(incrementBonusLessonsTotal())
                } else {
                    dispatch(incrementLessonProgress({grade: gradeNum - 1, section: sectionName}))
                    dispatch(incrementLessonsTotal())
                }
            }
        }
        // isTest ? dispatch(earn(reward * 5)) : dispatch(earn(reward))
        alert('good job!');
        navigate('/');
        setProgress(0);
    }

    const [lives, setLives] = useState([1, 1, 1]);
    const loseTest = () => {
        alert("nice try anyway! here's something for going this far")
        dispatch(earn(1));
        navigate('/');
        setProgress(0);
    }

    const lessonFormProps = {tasks, currentTask, setProgress, progress, isTest, setLives, lives, loseTest}

    return <>
        <div>
            <h1>Lesson</h1>

            {/*{!isTest && <button onClick={() => alert(theory)}>Theory</button>}*/}

            <NavLink to={"/"}>
                <button>Exit</button>
            </NavLink>

            <LinearProgress variant="determinate" value={progress}/>

            {isTest ? <div> {lives.map((life: any, index) => <span key={index}> 💗 </span>)} </div> : null}

            {tasks && <LessonForm {...lessonFormProps}/>}

        </div>
    </>
}

export default LessonScreen;