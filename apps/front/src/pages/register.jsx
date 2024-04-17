import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const RegisterSchema = Yup.object().shape({
    firstname: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Firstname is required'),
    lastname: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Lastname is required'),
    username: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Password is required'),
    rules: Yup.boolean().oneOf([true], 'You must accept the rules'),
})

export default function RegisterPage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-sm-12">
                <h2>Create new accout</h2>
                <Formik
                    initialValues={{
                        firstname: '',
                        lastname: '',
                        username: '',
                        email: '',
                        password: '',
                        rules: false,
                    }}
                    validationSchema={RegisterSchema}
                    onSubmit={async (values) => {
                        const response = await fetch('http://localhost:3001/api/users', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(values),
                        });
                        const status = response.status;
                        if(status === 400) {
                            const data = await response.json();
                            setErrors(data.message);
                        } else if (status === 201) {
                            navigate('/login');
                        }
                    }}
                >
                {
                    ({ errors, touched, isValidating, isSubmitting }) => ( // isValidating === false && isSubmitting === true
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
                                    placeholder="Your firstname goes here..."
                                />
                                <div className="invalid-feedback">{errors.firstname}</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="lastname">Lastname</label>
                                <Field className={
                                    `form-control
                                    ${touched.lastname && errors.lastname ? 'is-invalid' : ''}
                                    ${touched.lastname && !errors.lastname ? 'is-valid' : ''}
                                    `} 
                                    type="text"
                                    name="lastname"
                                    placeholder="Your lastname goes here..."
                                />
                                <div className="invalid-feedback">{errors.lastname}</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="username">Username</label>
                                <Field className={
                                    `form-control
                                    ${touched.username && errors.username ? 'is-invalid' : ''}
                                    ${touched.username && !errors.username ? 'is-valid' : ''}
                                    `} 
                                    type="text"
                                    name="username"
                                    placeholder="Your username goes here..."
                                />
                                <div className="invalid-feedback">{errors.username}</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                    <div className="input-group">
                                    <span class="input-group-text" id="inputGroupPrepend">@</span>
                                    <Field className={
                                        `form-control
                                        ${touched.email && errors.email ? 'is-invalid' : ''}
                                        ${touched.email && !errors.email ? 'is-valid' : ''}
                                        `} 
                                        type="text"
                                        name="email"
                                        placeholder="example@domain.com"
                                        />
                                    </div>
                                <div className="invalid-feedback">{errors.email}</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <Field className={
                                    `form-control
                                    ${touched.password && errors.password ? 'is-invalid' : ''}
                                    ${touched.password && !errors.password ? 'is-valid' : ''}
                                    `} 
                                    type="password"
                                    name="password"
                                    placeholder="Your password goes here..."
                                />
                                <div className="invalid-feedback">{errors.password}</div>
                                <div className="valid-feedback">Looking good</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="rules">Accept our rules</label>
                                <Field className={
                                    `form-control-check ms-2
                                    ${touched.rules && errors.rules ? 'is-invalid' : ''}
                                    ${touched.rules && !errors.rules ? 'is-valid' : ''}
                                    `} 
                                    type="checkbox"
                                    name="rules"
                                    id="rules"
                                />
                                <div className="invalid-feedback">{errors.rules}</div>
                                <div className="valid-feedback">It's ok</div>
                            </div>
                            {
                                !isValidating && isSubmitting 
                                ? <span className="spinner-border text-primary" role="status"></span>
                                : <button type="submit" className="btn btn-primary">Submit</button>
                            }
                            
                        </Form>
                    )
                }
                </Formik>
                </div>
            </div>
            <div className="row justify-content-center">
                {
                    errors.length > 0 &&
                    <div className="mt-4 alert alert-danger">
                        <ul className='list-group'>
                        {
                            errors.map((error, index) => <li key={index} className='list-group-item text-danger'>{error}</li>)
                        }
                        </ul>
                    </div>
                }
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