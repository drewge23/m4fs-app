import {FC} from "react";
import {NavLink} from "react-router-dom";

const Login: FC = () => {
    return (
    <div>
        <form action="#">
            <label htmlFor="email">email</label>
            <input name="email" type="email"/>
            <br />
            <label htmlFor="password">password</label>
            <input name="password" type="password"/>
            <br />
            <button type="submit">submit</button>
        </form>
        <NavLink to={"/registration"}>
            Sign up
        </NavLink>
        <br />
        <NavLink to={"/"}>
            Skip
        </NavLink>
    </div>
    )
}

export default Login;