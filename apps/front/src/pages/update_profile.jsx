import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const UpdateProfileSchema = Yup.object().shape({
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
})

export default function UpdateProfilePage() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/auth/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token') || ''
                }
            });
            const status = response.status;
            if(200 <= status && status <= 299) {
                const userData = await response.json();
                setUser(userData);
            } else {
                navigate('/login');
                localStorage.removeItem('access_token');
            }
        }
        fetchProfile();
        console.log(user)
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-sm-12">
                <h2>Create new accout</h2>
                <Formik
                    initialValues={user}
                    enableReinitialize={true}
                    validationSchema={UpdateProfileSchema}
                    onSubmit={async (values) => {
                        const response = await fetch('/api/auth/profile', {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('access_token') || ''
                            },
                            body: JSON.stringify(values),
                        });
                        const status = response.status;
                        if(status === 400) {
                            const data = await response.json();
                            setErrors(data.message);
                        } else if (status === 200) {
                            navigate('/profile');
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
                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
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
                            {
                                !isValidating && isSubmitting 
                                ? <span className="spinner-border text-primary" role="status"></span>
                                : <button type="submit" className="btn btn-primary">Update</button>
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