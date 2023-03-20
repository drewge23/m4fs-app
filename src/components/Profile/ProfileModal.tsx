import React, {useState} from 'react';
import {Backdrop, Box, Fade, Modal} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import PLUS from '../../assets/images/plus.png'
import handlePhotoChange from "../../BLL/auth/handlePhotoChange";
import {updateUserPersonalDataThunk} from "../../BLL/userDataSlice";
import s from './profile.module.css'

function ProfileModal({setShowProfile, showProfile, signOut}: any) {
    const handleClose = () => setShowProfile(false)
    const user = useSelector((state: any) => state.userData)
    const firebaseUser = useSelector((state: any) => state.firebase.user)

    const [picUrl, setPicUrl] = useState(user.avatarUrl)
    const [name, setName] = useState(user.fullName)

    const dispatch = useDispatch()
    const db = useSelector((state: any) => state.firebase.db)
    const userData = {
        fullName: name,
        avatarUrl: picUrl,
    }
    const onSubmit = () => {
        if (userData.fullName.length <= 0) {
            alert('Name field cannot be empty!')
            return
        }
        // @ts-ignore
        dispatch(updateUserPersonalDataThunk(db, user.userId ? user.userId : firebaseUser.uid, userData))
    }

    return (
        <Modal
            open={showProfile}
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
            <Fade in={showProfile}>
                <div className={s.profile}>
                    <Box className={'modal'}>
                        <p>Click below to change the profile picture</p>
                        <label htmlFor="profileAvatar" style={{
                            backgroundImage: picUrl ? `url(${picUrl})` : `url(${PLUS})`,
                        }} className={'avatar'}>

                            <input id='profileAvatar'
                                   type='file' onChange={(e) => handlePhotoChange(e, setPicUrl, user.userId)}
                                   style={{display: 'none'}}/>
                        </label>
                        <button className={s.delete}
                            onClick={() => setPicUrl(null)}>Delete 🗑️</button>

                        <label>Enter your full name please</label>
                        <input type="text"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               onKeyDown={(e) => {
                                   if (e.code === 'Enter') onSubmit()
                               }}
                        />
                        <div className={s.submitClose}>
                            <button className={s.submit}
                                onClick={() => {
                                onSubmit()
                                handleClose()
                            }}>Submit</button>
                            <button className={s.close}
                                onClick={handleClose}>Close</button>
                        </div>
                            <button className={s.delete}
                                onClick={signOut}>Sign out</button>
                    </Box>
                </div>
            </Fade>
        </Modal>
    )
}

export default ProfileModal;