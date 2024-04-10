import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Firstname is required'),
    // lastname: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(20, 'Too Long!')
    //     .required('Lastname is required'),
    // username: Yup.string()
    //     .min(3, 'Too Short!')
    //     .max(20, 'Too Long!')
    //     .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    // password: Yup.string()
    //     .min(8, 'Too Short!')
    //     .max(20, 'Too Long!')
    //     .required('Password is required'),
    rules: Yup.boolean().oneOf([true], 'You must accept the rules'),
})

export default function RegisterPage() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-sm-12">
                <h2>Create new accout</h2>
                <Formik
                    initialValues={{
                        firstname: '',
                        // lastname: '',
                        // username: '',
                        email: '',
                        // password: '',
                        rules: false,
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={values => {
                        console.log(values);
                        alert('Account created');
                    }}
                >
                {
                    ({ errors, touched }) => (
                        <Form>
                            <div className="mb-3">
                                <label htmlFor="firstname">Firstname</label>
                                <Field className={
                                    `form-control
                                    ${touched.firstname && errors.firstname ? 'is-invalid' : ''}
                                    ${touched.firstname && !errors.firstname ? 'is-valid' : ''}
                                    `} 
                                    type="text"
                                    name="firstname"
                                />
                                <div className="invalid-feedback">{errors.firstname}</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <Field className="form-control" type="email" name="email" id="email"/>
                                <div className="invalid-feedback">Invalid value</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rules">Accept our rules</label>
                                <Field className="form-control-check" type="checkbox" name="rules" id="rules"/>
                                <div className="invalid-feedback">Invalid value</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </Form>
                    )
                }
                </Formik>
                </div>
            </div>
        </div>
    )
}

{/* <form>
    <div className="mb-3">
        <label htmlFor="login">Login</label>
        <input className="form-control is-invalid" type="text" placeholder="Your login goes here..." id="login"/>
        <div className="invalid-feedback">Invalid value</div>
        <div className="valid-feedback">Looking good</div>
    </div>
    <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input className="form-control" type="email" placeholder="jane@example.com" id="email"/>
        <div className="invalid-feedback">Invalid value</div>
        <div className="valid-feedback">Looking good</div>
    </div>
    <button type="submit" className="btn btn-primary">Submit</button>
</form> */}