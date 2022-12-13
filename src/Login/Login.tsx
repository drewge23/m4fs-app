import {FC} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {Form, Field} from 'react-final-form'
import {useDispatch, useSelector} from "react-redux";
import {login} from "../user/userSlice";


const LoginForm: FC = () => {
    const dispatch = useDispatch();

    const onSubmit = (values: any) => {
        //DLA API goes here
        dispatch(login(values.email, values.password, values.rememberMe));
        window.alert(JSON.stringify(values))
    }

    return (
        <div>
            <h1>Login</h1>
            <Form
                onSubmit={onSubmit}
                initialValues={{}}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Email</label>
                            <Field
                                name="email"
                                component="input"
                                type="email"
                                placeholder="email@gmail.com"
                            />
                        </div>
                        <div>
                            <label>Password</label>
                            <Field
                                name="password"
                                component="input"
                                type="password"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label>remember me</label>
                            <Field name="rememberMe" component="input" type="checkbox"/>
                        </div>
                        <div className="buttons">
                            <button type="submit" disabled={submitting || pristine}>
                                Submit
                            </button>
                            <button
                                type="button"
                                onClick={form.reset}
                                disabled={submitting || pristine}
                            >
                                Reset
                            </button>
                        </div>
                        <pre>{JSON.stringify(values)}</pre>
                    </form>
                )}
            />
        </div>
    )
}

const Login: FC = () => {
    const isAuth = useSelector((state: any) => state.user.isAuth);
    if (isAuth) {
        return <Navigate to={'/profile'} />
    }

    return (
        <div>
            <LoginForm/>
            <NavLink to={"/registration"}>
                Sign up
            </NavLink>
            <br/>
            <NavLink to={"/"}>
                Skip
            </NavLink>
        </div>
    )
}

export default Login;