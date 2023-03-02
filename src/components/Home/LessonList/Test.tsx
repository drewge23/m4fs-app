import React from 'react';
import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import {motion} from "framer-motion";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import s from './lessonList.module.css'

function Test({test, sectionName, testCompleted}: any) {
    return (
        <NavLink to={"/lesson"}
                 state={{
                     sectionName,
                     lessonId: test.id,
                     lessonIndex: 0,
                     reward: test.data().reward,
                     theory: test.data().theory, //?
                     isBonus: false,
                     isTest: true,
                     testCompleted
                 }}
                 style={{
                     width: '100%',
                     textDecoration: 'none'
                 }}
        >
            <button
                className={s.testLink}
                style={{
                    backgroundColor: testCompleted ? 'var(--white-color)' : 'var(--main-color)',
                }}
            >
                {testCompleted ? '🏆' : '🚀'}
            </button>
        </NavLink>
    );
}

export default Test;