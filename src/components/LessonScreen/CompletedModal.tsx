import React from 'react';
import {Backdrop, Box, Fade, Modal} from "@mui/material";
import s from "./lessonScreen.module.css";
import {useNavigate} from "react-router-dom";

function CompletedModal({reward, showCompleted, setShowCompleted, setProgress, testLost}: any) {
    const navigate = useNavigate();
    const handleClose = () => {
        setShowCompleted(false)
        navigate('/')
        setProgress(0)
    }

    return (
        <Modal
            open={showCompleted}
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
            <Fade in={showCompleted}>
                <div>
                    <Box className={s.lessonTheory} style={{
                        height: '50vh',
                        textAlign: 'center',
                        gap: '2rem',
                    }}>
                        {!testLost
                            ? <div>
                                <h2>Congratulations! 🎉 </h2>
                                <h2>You've earned {reward}$ 💸</h2>
                            </div>
                            : <h2>Nice job anyway! Here's 1$ for going this far 🎁</h2>}
                        <button onClick={handleClose}> OK</button>
                    </Box>
                </div>
            </Fade>
        </Modal>
    );
}

export default CompletedModal;