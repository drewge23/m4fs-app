import React, {useEffect, useRef} from 'react';
import {Backdrop, Box, Fade, Modal, Typography} from "@mui/material";
import s from './lessonList.module.css'

function Theory({theoryIsOpen, setTheoryIsOpen, theory}: any) {
    const handleClose = () => setTheoryIsOpen(false)

    return (
        <Modal
            open={theoryIsOpen}
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
            <Fade in={theoryIsOpen}>
                <div>
                    <Box className={s.theory}>
                        {theory.data().imageUrl && <img src={theory.data().imageUrl} alt=""/>}
                        {theory && theory.data().text.map((line: string, index: number) => {
                            return <div key={index}>
                                <p className={s.theoryText}>{line}</p>
                                <p className={s.theoryExample}><b>{theory.data().examples[index]}</b></p>
                            </div>
                        })}
                        <div className={s.theoryButton}>
                            <button onClick={handleClose}>Nice!</button>
                        </div>
                    </Box>
                    {/*<Box className={s.theoryHint}>*/}
                    {/*    <p><span>💡</span> Get ready for the lesson!</p>*/}
                    {/*</Box>*/}
                </div>
            </Fade>
        </Modal>
    )
        ;
}

export default Theory;