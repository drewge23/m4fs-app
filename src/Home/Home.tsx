import {FC} from "react";
import {NavLink} from "react-router-dom";
import SectionList from "./SectionList/SectionList";
import {useSelector} from "react-redux";

const Home: FC = () => {
    const money = useSelector((state: any) => state.money)

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
                <NavLink to={"/shop"}> Shop </NavLink>
            </div>
            <div>
                <NavLink to={"/settings"}>
                    <button> Settings</button>
                </NavLink>
            </div>
            <div>{money + '$'}</div>
            <SectionList/>
        </div>
    )
}

export default Home;