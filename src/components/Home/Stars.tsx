import React from 'react';
import s from './home.module.css'
import {useSelector} from "react-redux";

function Stars(props: any) {
    const stars = useSelector((state: any) => state.stars)
    return (
        <div className={s.streak}>
            Stars {stars}
        </div>
    );
}

export default Stars;