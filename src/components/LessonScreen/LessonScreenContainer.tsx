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
import LessonScreen from "./LessonScreen";

// @ts-ignore
const LessonScreenContainer: FC = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const gradeNum = useSelector((state: any) => state.grade)
    const {sectionName, lessonId, sectionProgress, lessonIndex} = location.state;
    //TODO: from fetched data
    const isBonus = location.state.isBonus || false
    const isTest = location.state.isTest || false

    const tasks = useSelector((state: any) => state.currentLesson.tasks)

    useEffect(() => {
        // @ts-ignore
        dispatch(setLessonStateThunk(gradeNum, sectionName, lessonId))
    }, [])

    const lessonScreenProps = {
        sectionName, lessonId, sectionProgress, lessonIndex, isBonus, isTest, tasks
    }

    return <>
        {/*@ts-ignore*/}
        {tasks && <LessonScreen {...lessonScreenProps} />}
        {!tasks && <div>Loading...</div>}
    </>
}

export default LessonScreenContainer;