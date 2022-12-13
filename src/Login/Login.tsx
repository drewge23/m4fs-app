import {FC} from "react";
import {NavLink} from "react-router-dom";
import {Form, Field} from 'react-final-form'

const sleep = (ms:any) => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async (values:any) => {
    //DLA API goes here
    await sleep(300)
    window.alert(JSON.stringify(values))
}

const LoginForm: FC = () => {
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
                            <Field name="remember" component="input" type="checkbox"/>
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