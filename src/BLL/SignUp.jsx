import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setInitialUserDataThunk} from "./userDataSlice";
import s from './signUp.module.css'

function SignUp({userInAuth, db, signOut}) {
    const dispatch = useDispatch()
    const [userName, setUserName] = useState(userInAuth.displayName)

    const onSubmit = () => {
        const userData = {
            fullName: userName,
        }
        dispatch(setInitialUserDataThunk(db, userInAuth.uid, userData))
    }

    return (
        <div className={s.signUpScreen}>
            <div className={s.signUpForm}>
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