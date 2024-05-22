import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

const CommentSchema = Yup.object().shape({
    content: Yup.string()
        .min(10, 'Too short!')
        .max(300, 'Too long!')
        .required('Content is required!'),
    rating: Yup.number()
        .min(1, 'Too low!')
        .max(5, 'Too high!')
        .required('Rating is required!')
});

export default function CommentsForm({ gameId }) {
    return (
        <Formik
            initialValues={{
                content: '',
                rating: 5
            }}
            validationSchema={CommentSchema}
            onSubmit={async (values) => {
                const token = localStorage.getItem('access_token') ?? '';
                const createdAt = new Date().toISOString();
                const response = await fetch(`/api/comments/${gameId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({...values, createdAt})
                });
                console.log(response.status)
                if(response.ok) { // status code: 200-299
                    alert('Comment submitted!');
                } else {
                    alert('Error submitting comment!');
                }
            }}
        >
            {
                ({errors, touched}) => (
                    <Form>
                        <div className="mb-3">
                            <label htmlFor="content">Write your comment...</label>
                            <Field className={
                                `form-control
                                ${touched.content && errors.content ? 'is-invalid' : ''}
                                ${touched.content && !errors.content ? 'is-valid' : ''}
                                `} 
                                type="textarea"
                                name="content"
                            />
                            <div className="invalid-feedback">{errors.content}</div>
                            <div className="valid-feedback">Looking good</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rating">Rating</label>
                            <Field className={
                                `
                                ${touched.rating && errors.rating ? 'is-invalid' : ''}
                                ${touched.rating && !errors.rating ? 'is-valid' : ''}
                                `} 
                                type="range"
                                name="rating"
                                min="1"
                                max="5"
                            />
                            <div className="invalid-feedback">{errors.rating}</div>
                            <div className="valid-feedback">Looking good</div>
                        </div>
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}