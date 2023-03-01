import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {setInitialUserDataThunk} from "./userDataSlice";

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
        <div style={{
            width: '500px',
            height: '500px',
            backgroundColor: 'lightblue',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
        }}>
            <h3>Input your name please</h3>
            <input type="text"
                   value={userName}
                   onChange={(e) => setUserName(e.target.value)}
                   onKeyDown={(e) => {
                       if (e.code === 'Enter') onSubmit()
                   }}
            />
            <button onClick={signOut}>I've changed my mind</button>
        </div>
    );
}

export default SignUp;