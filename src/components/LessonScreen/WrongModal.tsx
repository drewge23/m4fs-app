import React, {useEffect, useRef} from 'react';
import s from './lessonScreen.module.css'
import {Box, Fade} from "@mui/material";

function WrongModal({isWrong, setIsWrong, isLastLife}: any) {
    const handleContinue = () => setIsWrong(false)
    return (
        <Fade in={isWrong}>
            <div>
                <Box className={s.correctModal} style={{
                    backgroundColor: '#e07979',
                    borderTop: '1px solid #ac4670',
                }}>
                    {!isLastLife
                        ? <p>Incorrect</p>
                        : <p>Be careful! 💔 </p>}
                    <button onClick={handleContinue} type={'button'} autoFocus> Continue</button>
                </Box>
            </div>
        </Fade>
    )
}

export default WrongModal;