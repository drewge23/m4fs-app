import React from 'react';
import s from './lessonScreen.module.css'
import {Box, Fade} from "@mui/material";

function CorrectModal({isCorrect, handleContinue}: any) {
    return (
        <Fade in={isCorrect}>
            <div>
                <Box className={s.correctModal}>
                    <p>Good job!</p>
                    <button onClick={handleContinue} type={'button'}> Continue</button>
                </Box>
            </div>
        </Fade>
    )
}

export default CorrectModal;