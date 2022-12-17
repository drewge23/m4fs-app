import {FC} from "react";
import {NavLink} from "react-router-dom";
import LessonList from "./LessonList/LessonList";
import {Accordion, Button, Card} from "@mui/material";

const Home: FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <div>
                <NavLink to={"/login"}> Log in </NavLink>
            </div>
            <div>
                <NavLink to={"/profile"}> Profile </NavLink>
            </div>
            <div>
                <NavLink to={"/settings"}>
                    <button> Settings</button>
                </NavLink>
            </div>
            <LessonList/>
        </div>
    )
}

export default Home;