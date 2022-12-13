import {FC} from "react";

const Login: FC = () => {
    return (
        <form action="#">
            <label htmlFor="email">email</label>
            <input name="email" type="email"/>
            <label htmlFor="password">password</label>
            <input name="password" type="password"/>
            <button type="submit">submit</button>
        </form>
    )
}

export default Login;