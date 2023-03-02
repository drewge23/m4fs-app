import React from 'react';
import {Backdrop, Box, Fade, Modal, Typography} from "@mui/material";
import s from './lessonList.module.css'

function Theory({theoryIsOpen, setTheoryIsOpen, theory}: any) {
    const handleClose = () => setTheoryIsOpen(false)

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={theoryIsOpen}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    // @ts-ignore
                    timeout: 500,
                },
            }}
        >
            <Fade in={theoryIsOpen}>
                <Box className={s.theory}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Fade>
        </Modal>
    );
}

export default Theory;