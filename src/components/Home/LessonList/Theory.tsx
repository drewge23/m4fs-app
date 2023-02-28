import React from 'react';
import {Box, Modal, Typography} from "@mui/material";
import s from './lessonList.module.css'

function Theory({theoryIsOpen, setTheoryIsOpen, theory}: any) {
    const handleClose = () => setTheoryIsOpen(false)

    return (
        <Modal
            open={theoryIsOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={s.theory}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
            </Box>
        </Modal>
    );
}

export default Theory;