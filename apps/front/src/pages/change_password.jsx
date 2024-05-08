import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, 'Too short!')
        .max(20, 'Too long!')
        .required('Password is required!'),
    confirmPassword: Yup.string()
        .required('Password confirmation is required!')
});

function validateConfirmPassword(pass, value) {
    let error;
    if (pass && value) {
      if (pass !== value) {
        error = 'Passwords do not match';
      }
    }
    return error;
}

export default function ChangePasswordPage() {

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-sm-12">
                    <h2>Change password</h2>
                    <Formik
                        initialValues={{
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={ChangePasswordSchema}
                        onSubmit={(values) => alert(values.password)}
                    >
                    {
                        ({errors, touched, values}) => (
                            <Form>
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
                                    <label htmlFor="password">Confirm password</label>
                                    <Field className={
                                        `form-control
                                        ${touched.confirmPassword && errors.confirmPassword ? 'is-invalid' : ''}
                                        ${touched.confirmPassword && !errors.confirmPassword ? 'is-valid' : ''}
                                        `} 
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Your password goes here..."
                                        validate={() => validateConfirmPassword(values.password, values.confirmPassword)}
                                    />
                                    <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    <div className="valid-feedback">Looking good</div>
                                </div>
                                <button type="submit" className='btn btn-primary'>Submit</button>
                            </Form>
                        )
                    }
                    </Formik>
                </div>
            </div>
        </div>
    )
}