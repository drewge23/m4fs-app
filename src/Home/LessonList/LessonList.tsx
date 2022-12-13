import {NavLink} from "react-router-dom";
import {FC} from "react";

const LessonList: FC = () => {
    return (
        <div>
            <div>
                <NavLink to={"/lesson"}> lesson 1 </NavLink>
            </div>
            <div>
                <NavLink to={"/lesson"}> bonus lesson 1 </NavLink>
            </div>
            <div>
                <NavLink to={"/lesson"}> lesson 1 </NavLink>
            </div>
            <div>
                <NavLink to={"/lesson"}> lesson 3 </NavLink>
            </div>
        </div>
    )
}

export default LessonList;