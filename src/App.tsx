import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import LessonScreen from "./components/LessonScreen/LessonScreen";
import {useDispatch} from "react-redux";
import Shop from "./components/Shop/Shop";
import LessonScreenCopy from "./components/LessonScreen/LessonScreen";

import firebase from "firebase/compat/app";
import 'firebase/compat/analytics';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {setApp} from "./firebaseSlice";

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
const auth = firebase.auth(app);
const db = firebase.firestore(app)

function App() {
    const dispatch = useDispatch()
    dispatch(setApp(app))

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="" element={<Home/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="shop" element={<Shop/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="lesson" element={<LessonScreenCopy/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
