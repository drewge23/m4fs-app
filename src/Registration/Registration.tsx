import {FC} from "react";

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
        </form>
    )
}

export default Registration;