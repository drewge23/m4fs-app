import React from 'react';
import s from './home.module.css'
import {useSelector} from "react-redux";
import {Tooltip} from "@mui/material";

function Streak(props: any) {
    const streak = useSelector((state: any) => state.streak)
    return (
        <div className={s.streak} style={streak.streakIsIncrementable
            ? {
                backgroundColor: 'var(--dark-color)',
                color: 'white',
                boxShadow: '10px 10px 1px 1px var(--light-color)',
            }
            : {
                backgroundColor: 'var(--light-color)',
                color: 'black',
            }}>
            <Tooltip title="Complete a lesson to increment your streak"
                     disableHoverListener={!streak.streakIsIncrementable}>
                <h2>
                    {streak.streakIsIncrementable ? '🕔 ' : '🔥 '}
                    {streak.streak}
                </h2>
            </Tooltip>
        </div>
    );
}

export default Streak;