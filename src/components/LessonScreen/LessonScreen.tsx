import React, {FC, useEffect, useState} from "react";
import {Navigate, NavLink, redirect, useLocation, useNavigate} from "react-router-dom";
import {Box, Container, LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setLessonStateThunk} from "../../BLL/currentLessonSlice";
import {incrementBonusProgress, incrementLessonProgress, setTestCompleted} from "../../BLL/progressSlice";
import {earn} from "../../BLL/moneySlice";
import {incrementBonusLessonsTotal, incrementLessonsTotal} from "../../BLL/statisticsSlice";
import LessonForm from "./LessonForm";
import LessonTheory from "./LessonTheory";
import {incrementStreak, setStreakIsIncrementable} from "../../BLL/streakSlice";
import {incrementStars} from "../../BLL/starsSlice";
import LoadingScreen from "../LoadingScreen";
import s from './lessonScreen.module.css'

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
        }
    }, [progress])
    useEffect(() => {
        if (tasksDone.length === 0) return
        let tempIndex = Math.floor(Math.random() * tasks.length)
        // @ts-ignore
        while (tasksDone.includes(tempIndex)) {
            tempIndex = Math.floor(Math.random() * tasks.length)
        }
        setCurrentTask(tempIndex);
    }, [tasksDone])

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
        dispatch(earn(reward))
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

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1000)
    }, [])

    return <>
        {isLoading
            ? <LoadingScreen/>
            : <Container sx={{width: '100%', maxWidth: '600px'}}>
                <Box className={s.lessonScreen}>

                    <LinearProgress variant="determinate" value={progress}
                                    color={'secondary'} className={s.progress}
                                    sx={{
                                        width: '60%',
                                        height: '1rem',
                                        marginBottom: '1rem',
                                        borderRadius: '1rem',
                                    }}
                    />

                    <div className={s.hintExit}>
                        {!isTest && <button className={s.hint}
                                            onClick={() => setShowTheory(!showTheory)}>💡</button>}
                        {isTest && <div className={s.lives}>
                            {lives.map((life: any, index) => <span key={index}> 💗 </span>)}
                        </div>}

                        <NavLink to={"/"}>
                            <button className={s.exit}>❌</button>
                        </NavLink>
                    </div>

                    {showTheory && <LessonTheory theory={theory} setShowTheory={setShowTheory}/>}

                    {tasks && <LessonForm {...lessonFormProps}/>}

                </Box>
            </Container>}
    </>
}

export default LessonScreen;