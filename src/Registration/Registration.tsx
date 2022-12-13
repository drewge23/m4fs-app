import {FC} from "react";
import {NavLink} from "react-router-dom";

const Registration: FC = () => {
    return (
        <form action="#">
            <label htmlFor="email">email</label>
            <input name="email" type="email"/>
            <label htmlFor="password">password</label>
            <input name="password" type="password"/>
            <label htmlFor="email">email</label>
            <input name="email" type="email"/>
            <label htmlFor="password">password</label>
            <input name="password" type="password"/>
            <button type="submit">submit</button>
            <NavLink to={"/"}>
                Skip
            </NavLink>
        </form>
    )
}

export default Registration;