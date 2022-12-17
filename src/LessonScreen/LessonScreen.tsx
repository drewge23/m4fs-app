import React, {FC} from "react";
import Addition from "../lessons/Addition";
import {NavLink} from "react-router-dom";
import AdditionX3 from "../lessons/AdditionX3";

const LessonScreen: FC = () => {
    return (
        <div>
            <h1>Lesson</h1>
            <NavLink to={"/"}> leave the lesson </NavLink>
            <AdditionX3 />
        </div>
    )
}

export default LessonScreen;