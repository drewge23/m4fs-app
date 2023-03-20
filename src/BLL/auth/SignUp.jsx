import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setInitialUserDataThunk} from "../userDataSlice";
import s from './signUp.module.css'
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import handlePhotoChange from "./handlePhotoChange";
import Avatar from "@mui/material/Avatar";
import PLUS from '../../assets/images/plus.png'

function SignUp({userInAuth, db, signOut}) {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState(userInAuth.displayName)
    const [userPicUrl, setUserPicUrl] = useState(userInAuth.photoURL)

    const onSubmit = () => {
        const userData = {
            fullName: userName,
            avatarUrl: userPicUrl,
            userId: userInAuth.uid,
        }
        dispatch(setInitialUserDataThunk(db, userInAuth.uid, userData))
    }

    return (
        <div className={s.signUpScreen}>
            <div className={s.signUpForm}>
                <p>Click below to change the profile picture</p>
                <label htmlFor="signUpAvatar" style={{
                    backgroundImage: userPicUrl ? `url(${userPicUrl})` : `url(${PLUS})`,
                }} className={'avatar'}>

                    <input id='signUpAvatar'
                           type='file' onChange={(e) => handlePhotoChange(e, setUserPicUrl, userInAuth.uid)}
                           style={{display: 'none'}}/>
                </label>
                <button onClick={() => setUserPicUrl(null)}>Delete ❌</button>

                <label>Enter your full name please</label>
                <input type="text"
                       value={userName}
                       onChange={(e) => setUserName(e.target.value)}
                       onKeyDown={(e) => {
                           if (e.code === 'Enter') onSubmit()
                       }}
                />
                <div>
                    <button onClick={onSubmit}>Submit</button>
                    <button onClick={signOut}>Go back</button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;