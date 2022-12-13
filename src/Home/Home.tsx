import {FC} from "react";
import {NavLink} from "react-router-dom";
import LessonList from "./LessonList/LessonList";

const Home: FC = () => {
    return (
        <div>
            Home
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
            <LessonList />
        </div>
    )
}

export default Home;