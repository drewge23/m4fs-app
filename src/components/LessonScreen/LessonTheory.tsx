import React from 'react';
import s from './lessonScreen.module.css'

function LessonTheory({theory, setShowTheory, showTheory}: any) {
    const [imgUrl, ...text] = theory
    return (
        <div className={s.lessonTheory}>
            <button onClick={() => setShowTheory(false)}> hide </button>
            {imgUrl && <img src={imgUrl} alt="pic.1"/>}
            {text.map((line: string, index: number) => {
              return <p key={index}>{line}</p>
            })}
        </div>
    );
}

export default LessonTheory;