import React, {FC, useState} from "react";
import Addition from "../lessons/Addition";
import {NavLink} from "react-router-dom";
import AdditionX3 from "../lessons/AdditionX3";
import {LinearProgress} from "@mui/material";
import {useFormik} from "formik";

const LessonScreen: FC = () => {
    let Lesson = Addition;

    const [progress, setProgress] = useState(0);

    const formik = useFormik({
        initialValues: {answers: []},
        onSubmit: (values) => {
            setProgress(progress + 25)
            alert(JSON.stringify(values, null, 2));
        },
    });

    return (
        <div>
            <h1>Lesson</h1>
            <button onClick={() => alert('here goes the Theory section')}>Theory</button>
            <NavLink to={"/"}>
                <button>Exit</button>
            </NavLink>
            <LinearProgress variant="determinate" value={progress}/>
            <form onSubmit={formik.handleSubmit}>
                <Lesson formik={formik}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default LessonScreen;