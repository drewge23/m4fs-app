import {Input} from "@mui/material";
import {Form, Field} from "react-final-form";
import {useState} from "react";

const additionGenerator = () => {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    return {
        coefs: [a, b],
        answers: [a + b]
    }
}

const Addition = () => {
    const [{coefs, answers}, generateCoefs] = useState(additionGenerator());

    const onSubmit = (values: any) => {
        if (!values.answer) {
            return {answer: 'Required'}
        }
        if (Number(values.answer) !== answers[0]) {
            return {answer: 'Wrong answer'}
        }
        alert("right!");
        generateCoefs(additionGenerator());
    }

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                // validate={values => {
                    // const errors: any = {}
                    // if (!values.answer) {
                    //     errors.answer = 'Required'
                    // }
                    // if (Number(values.answer) !== answers[0]) {
                    //     errors.answer = 'wrong answer'
                    // }
                    // return errors
                //}}
                render={({submitError, handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        <label><span> {coefs[0]} </span> {'+'} <span> {coefs[1]} </span> {'='}</label>
                        <Field name="answer">
                            {({input, meta}) => (
                                <div>
                                    <Input {...input} autoFocus type="text"/>
                                    {(meta.error || meta.submitError) && meta.touched && (
                                        <span>{meta.error || meta.submitError}</span>
                                    )}
                                </div>
                            )}
                        </Field>
                        <div className="buttons">
                            <button type="submit" disabled={submitting}>
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
                    </form>
                )}/>
        </div>
    )
}

export default Addition;