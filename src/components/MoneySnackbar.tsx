import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {snackbarOff} from "../BLL/utilsSlice";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MoneySnackbar({snackbar}: any) {
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(snackbarOff());
    };

    return (
        <Snackbar open={snackbar !== 0} autoHideDuration={6000} onClose={handleClose} className={'snackbar'}>
            <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                You have earned {snackbar}$!
            </Alert>
        </Snackbar>
    )
}