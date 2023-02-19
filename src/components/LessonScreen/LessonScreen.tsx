import React, {FC, useEffect, useState} from "react";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LinearProgress} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {setLessonStateThunk} from "../../BLL/currentLessonSlice";
import {incrementBonusProgress, incrementLessonProgress, testCompleted} from "../../BLL/progressSlice";
import {earn} from "../../BLL/moneySlice";
import grades from "../../lessons/grades";
import {incrementBonusLessonsTotal, incrementLessonsTotal} from "../../BLL/globalProgressSlice";
import LessonForm from "./LessonForm";

// @ts-ignore
const LessonScreen: FC = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const gradeNum = useSelector((state: any) => state.grade)
    const {sectionName, lessonId} = location.state;
    //from fetched data
    const isBonus = location.state.isBonus || false
    const isTest = location.state.isTest || false

    const tasks = useSelector((state: any) => state.currentLesson.tasks)

    //In container?
    useEffect(() => {
        // @ts-ignore
        dispatch(setLessonStateThunk(gradeNum, sectionName, lessonId))
    }, [])

    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState(0)

    useEffect(() => {
        if (progress >= 100) {
            // @ts-ignore
            if (isTest && id < section.lessons.length) {
                setProgress(0)
                // setId(id + 1)
            } else {
                onCompletion(gradeNum, sectionName, 0, 0)
            }
        }
        if (progress > 0) setCurrentTask(currentTask + 1);
    }, [progress])

    function onCompletion(gradeNum: number, sectionName: string, sectionProgress: number, lessonIndex: number) {
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
        {tasks
            ? <div>
                <h1>Lesson</h1>

                {/*{!isTest && <button onClick={() => alert(theory)}>Theory</button>}*/}

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