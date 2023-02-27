import React, {FC, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setLessonStateThunk} from "../../BLL/currentLessonSlice";
import {incrementBonusProgress, incrementLessonProgress, setTestCompleted} from "../../BLL/progressSlice";
import {earn} from "../../BLL/moneySlice";
import {incrementBonusLessonsTotal, incrementLessonsTotal} from "../../BLL/statisticsSlice";
import LessonForm from "./LessonForm";
import Theory from "./Theory";
import {incrementStreak, setStreakIsIncrementable} from "../../BLL/streakSlice";
import {incrementStars} from "../../BLL/starsSlice";

// @ts-ignore
const LessonScreen: FC = ({
                              sectionName, lessonId, sectionProgress, lessonIndex,
                              isBonus, isTest, testCompleted, tasks, reward, theory
                          }: any) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const gradeNum = useSelector((state: any) => state.grade)

    const [progress, setProgress] = useState(0);
    const [tasksDone, setTasksDone] = useState([])
    const [currentTask, setCurrentTask] = useState(Math.floor(Math.random() * tasks.length))

    useEffect(() => {
        if (progress >= 100) {
            onCompletion(gradeNum, sectionName, sectionProgress, lessonIndex)
        }
        if (progress > 0) {
            let temp = [...tasksDone]
            // @ts-ignore
            temp.push(currentTask)
            setTasksDone(temp)

            let tempIndex = Math.floor(Math.random() * tasks.length)
            // @ts-ignore
            while (tasksDone.includes(tempIndex)) {
                tempIndex = Math.floor(Math.random() * tasks.length)
            }
            setCurrentTask(tempIndex);
        }
    }, [progress])

    const streak = useSelector((state: any) => state.streak)

    function onCompletion(gradeNum: number, sectionName: string, sectionProgress: number, lessonIndex: number) {
        if (streak.streakIsIncrementable) {
            dispatch(incrementStreak())
            dispatch(setStreakIsIncrementable(false))
        }
        if (isTest && !testCompleted) {
            dispatch(setTestCompleted({grade: gradeNum - 1, section: sectionName}))
            dispatch(incrementStars())
        } else {
            if (sectionProgress <= lessonIndex) {
                dispatch(incrementStars())
                if (isBonus) {
                    dispatch(incrementBonusProgress({grade: gradeNum - 1, section: sectionName}))
                    dispatch(incrementBonusLessonsTotal())
                } else {
                    dispatch(incrementLessonProgress({grade: gradeNum - 1, section: sectionName}))
                    dispatch(incrementLessonsTotal())
                }
            }
        }
        isTest ? dispatch(earn(reward * 5)) : dispatch(earn(reward))
        alert('good job!');
        navigate('/');
        setProgress(0);
    }

    const [showTheory, setShowTheory] = useState(false)

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

            {!isTest && <button onClick={() => setShowTheory(!showTheory)}>Theory</button>}

            <NavLink to={"/"}>
                <button>Exit</button>
            </NavLink>

            <LinearProgress variant="determinate" value={progress}/>

            <div style={{display: showTheory ? 'flex' : 'none'}}>
                <Theory theory={theory} setShowTheory={setShowTheory}/>
            </div>

            {isTest ? <div> {lives.map((life: any, index) => <span key={index}> 💗 </span>)} </div> : null}

            {tasks && <LessonForm {...lessonFormProps}/>}

        </div>
    </>
}

export default LessonScreen;