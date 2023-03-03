import React from 'react';
import s from './lessonScreen.module.css'
import {Backdrop, Box, Fade, Modal} from "@mui/material";

function LessonTheory({theory, setShowTheory, showTheory}: any) {
    const [imgUrl, ...text] = theory
    const handleClose = () => setShowTheory(false)

    return (
        <Modal
            open={showTheory}
            onClose={handleClose}
            closeAfterTransition
            slots={{backdrop: Backdrop}}
            slotProps={{
                backdrop: {
                    // @ts-ignore
                    timeout: 500,
                },
            }}
        >
            <Fade in={showTheory}>
                <div>
                    <Box className={s.lessonTheory}>
                        <button onClick={handleClose}>Hide</button>
                        {imgUrl && <img src={imgUrl} alt="pic.1"/>}
                        {text.map((line: string, index: number) => {
                            return <p key={index}>{line}</p>
                        })}
                    </Box>
                </div>
            </Fade>
        </Modal>
    )
}

export default LessonTheory;