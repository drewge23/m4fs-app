import {FC} from "react";
import {NavLink} from "react-router-dom";
import {Form, Field} from "react-final-form";
import './Registration.module.css';
import {useDispatch} from "react-redux";
import {setUserInfo} from "../../BLL/userSlice";

const RegistrationForm: FC = () => {
    const dispatch = useDispatch();

    const onSubmit = (values: any) => {
        dispatch(setUserInfo(values));
    };

    return (
        <div className="formContainer">
            <h1>Registration</h1>
            <Form
                onSubmit={onSubmit}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="firstName">
                            {({input, meta}) => (
                                <div>
                                    <label>First name</label>
                                    <input {...input} type="text" placeholder="John"/>
                                </div>
                            )}
                        </Field>
                        <div>
                            <label>Last name</label>
                            <Field
                                name="lastName"
                                component="input"
                                type="text"
                                placeholder="Doe"
                            />
                        </div>
                        <div>
                            <label>User name</label>
                            <Field
                                name="userName"
                                component="input"
                                type="text"
                                placeholder="Coolguy_2006😎"
                            />
                        </div>
                        <div>
                            <label>Email</label>
                            <Field
                                name="email"
                                component="input"
                                type="email"
                                placeholder="johndoe@gmail.com"
                            />
                        </div>
                        <div>
                            <label>Phone number</label>
                            <Field
                                name="phoneNumber"
                                component="input"
                                type="tel"
                                placeholder="+972 000-00-00"
                            />
                        </div>
                        <div>
                            <label>Date of birth</label>
                            <Field
                                name="dateOfBirth"
                                component="input"
                                type="date"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label>Country</label>
                            <Field
                                name="country"
                                component="input"
                                type="text"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <label>Profile picture</label>
                            <Field
                                name="profilePic"
                                component="input"
                                type="file"
                                placeholder=""
                            />
                        </div>
                        <div>
                            <button type="submit">
                                Submit
                            </button>
                            <button type="reset">
                                Reset
                            </button>
                        </div>
                        <pre>{JSON.stringify(values)}</pre>
                    </form>
                )
                }
            />
        </div>
    )
}

const Registration: FC = () => {
    return (
        <div>
            <RegistrationForm/>
            <NavLink to={"/"}>
                Skip
            </NavLink>
        </div>
    )
}

export default Registration;