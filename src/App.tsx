import React, {useEffect, useState} from 'react';
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
import {resetStreak, setStreakIsIncrementable} from "./BLL/streakSlice";
import {getUserDataThunk} from "./BLL/userDataSlice";
import initialProgress from "./BLL/initialProgress";
import Auth from "./BLL/Auth";
import {useAuthState} from "react-firebase-hooks/auth";
import SignUp from "./BLL/SignUp";
import "./assets/fonts/Cunia.ttf"
import {lesson, theory} from "./tasks/taskTypes";
import lessons from "./tasks/lessons";
import Preloader from "./components/Preloader";
import {initialStreak} from "./BLL/initialStreak";

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
    // const lessonsToExport: (lesson | theory)[] = lessons
    // const [flag, setFlag] = useState(true)
    // useEffect(() => {
    //     if (!flag) return
    //     for (let lesson of lessonsToExport) {
    //         db.collection("lessons").doc(`grade_${lesson.gradeNum}`)
    //             .collection(lesson.sectionName).doc(lesson.lessonId).set(lesson)
    //     }
    //     setFlag(false)
    // }, [])

    const dispatch = useDispatch()

    // AUTHENTICATION
    // @ts-ignore
    const [user] = useAuthState(auth)
    const signOut = () => {
        auth.signOut()
    }

    // GETTING USER DATA
    // @ts-ignore
    useEffect(() => {
        dispatch(setApp(app))
        dispatch(setDB(db))
        if (!user) return
        dispatch(setUser(user))
        // @ts-ignore
        dispatch(getUserDataThunk(db, user?.uid))
    }, [user])

    const isInitialized = useSelector((state: any) => state.userData.isInitialized)

    // UPDATING THE STREAK
    const streak = useSelector((state: any) => state.streak)
    useEffect(() => {
        if (streak.streakUpdateTime === initialStreak.streakUpdateTime) return;
        if (!isInitialized) return
        let currentTime = new Date()
        const deadline = streak.streakDeadline
        if (currentTime > deadline) {
            dispatch(resetStreak())
        }
        let newDayTime = new Date(deadline)
        newDayTime.setDate(newDayTime.getDate() - 1)
        if (currentTime > newDayTime) {
            dispatch(setStreakIsIncrementable(true))
        }
    }, [streak])
    useEffect(() => {
        if (streak.streakUpdateTime === initialStreak.streakUpdateTime) return;
        if (!isInitialized) return
        db.collection("users").doc(user?.uid)
            .update({streak: JSON.stringify(streak)})
    }, [streak])

    const progress = useSelector((state: any) => state.progress)
    const stars = useSelector((state: any) => state.stars)
    useEffect(() => {
        if (!isInitialized) return
        if (progress !== initialProgress) {
            db.collection("users").doc(user?.uid)
                .update({progress: JSON.stringify(progress)})
            db.collection("users").doc(user?.uid)
                .update({stars: stars})
        }
    }, [progress])

    const money = useSelector((state: any) => state.money)
    useEffect(() => {
        if (!isInitialized) return
        db.collection("users").doc(user?.uid)
            .update({money: money})
    }, [money])

    const userData = useSelector((state: any) => state.userData)

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000) // how much?
    }, [])

    return (
        <>
            {isLoading && <Preloader />}
            {!isLoading && <>
                {!user && <Auth app={app}/>}
                {/*@ts-ignore*/}
                {user && !userData?.fullName && <SignUp userInAuth={user} db={db}/>}
                {/*@ts-ignore*/}
                {user && userData?.fullName && <BrowserRouter>
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
            </>}
        </>
    );
}

export default App;
