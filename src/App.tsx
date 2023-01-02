import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import LessonScreen from "./LessonScreen/LessonScreen";
import {useDispatch} from "react-redux";
import {auth} from "./user/userSlice";
import Shop from "./Shop/Shop";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

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
                    <Route path="lesson" element={<LessonScreen/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
