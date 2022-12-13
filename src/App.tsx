import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login/Login";
import Registration from "./Registration/Registration";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Settings from "./Settings/Settings";
import Lesson from "./Lesson/Lesson";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path="login" element={<Login/>}/>
                    <Route path="registration" element={<Registration/>}/>
                    <Route path="" element={<Home/>}/>
                    <Route path="profile" element={<Profile/>}/>
                    <Route path="settings" element={<Settings/>}/>
                    <Route path="lesson" element={<Lesson/>}/>
                </Routes>
            </div>

        </BrowserRouter>
    );
}

export default App;
