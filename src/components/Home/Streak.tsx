import React from 'react';
import s from './home.module.css'
import {useSelector} from "react-redux";

function Streak(props: any) {
    const streak = useSelector((state: any) => state.streak)
    return (
        <div className={s.streak}>
            <h2 style={{color: streak.streakIsIncrementable ? 'gray' : 'black'}}>
                {streak.streakIsIncrementable ? '🕔 ' : '🔥 '}
                {streak.streak}
            </h2>
        </div>
    );
}

export default Streak;