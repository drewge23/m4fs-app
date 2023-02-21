import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import {useDispatch, useSelector} from "react-redux";
import Shop from "./components/Shop/Shop";

import firebase from "firebase/compat/app";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {setApp, setDB, setUser} from "./BLL/firebaseSlice";
import LessonScreenContainer from "./components/LessonScreen/LessonScreenContainer";
import {getProgressThunk} from "./BLL/progressSlice";
import {getUserDataThunk} from "./BLL/userDataSlice";
import initialProgress from "./BLL/initialProgress";
import Auth from "./BLL/Auth";
import {useAuthState} from "react-firebase-hooks/auth";
import SignUp from "./BLL/SignUp";

const firebaseConfig = {
    apiKey: "AIzaSyDdSlecVhBVceLY5YD6-yQmDRhw_F6IpZo",
    authDomain: "m4fs-id.firebaseapp.com",
    projectId: "m4fs-id",
    storageBucket: "m4fs-id.appspot.com",
    messagingSenderId: "807617556673",
    appId: "1:807617556673:web:1f4b1c4653a1daf301a440",
    measurementId: "G-K46HV2C4F8"
};
const app = firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics(app);
const db = firebase.firestore(app)
const auth = firebase.auth(app)

function App() {
    const dispatch = useDispatch()
    // @ts-ignore
    const [user] = useAuthState(auth)
    const signOut = () => {
        auth.signOut()
    }

    // @ts-ignore
    useEffect(() => {
        dispatch(setApp(app))
        dispatch(setDB(db))
        if (user) dispatch(setUser(user))
        // @ts-ignore
        dispatch(getUserDataThunk(db, user?.uid))
        // @ts-ignore
        dispatch(getProgressThunk(db, user?.uid)) //TODO: delete
    }, [user])

    const progress = useSelector((state: any) => state.progress) //delete
    useEffect(() => {
        if (progress !== initialProgress)
            db.collection("users").doc(user?.uid)
                .update({progress: JSON.stringify(progress)})
    }, [progress])

    // @ts-ignore
    // const [userInDB] = useDocument(db.collection('users').doc(auth.currentUser?.uid))
    // const [userInDB, setUserInDB] = useState(null)
    // useEffect(() => {
    //     db.collection('users').doc(auth.currentUser?.uid).get()
    //         .then((response: any) => setUserInDB(response))
    //     console.log(userInDB)
    // }, [])
    const userData = useSelector((state: any) => state.userData)

    return (
        <>
            {!user && <Auth app={app}/>}
            {/*@ts-ignore*/}
            {user && !userData?.progress && <SignUp userInAuth={user} db={db}/>}
            {/*@ts-ignore*/}
            {user && userData?.progress && <BrowserRouter>
                <div className="App">
                    <Routes>
                        {/*@ts-ignore*/}
                        <Route path="" element={<Home signOut={signOut}/>}/>
                        <Route path="profile" element={<Profile/>}/>
                        <Route path="shop" element={<Shop/>}/>
                        <Route path="settings" element={<Settings/>}/>
                        <Route path="lesson" element={<LessonScreenContainer/>}/>
                        <Route path="/*" element={<div>404</div>}/>
                    </Routes>
                </div>
            </BrowserRouter>}
        </>
    );
}

export default App;
