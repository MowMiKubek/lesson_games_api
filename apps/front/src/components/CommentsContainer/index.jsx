import { useAuth } from "../../lib/AuthContext";
import { Comment } from "./comment";

export default function CommentsContainer({ comments }) {
    const {isAuthenticated} = useAuth();
    return (
        <div>
            <h3>Comments</h3>
            {
                isAuthenticated
                ? 
                <form action="">
                    <textarea className="form-control mb-3"></textarea>
                    <button type="submit">Submit</button>
                </form>
                : <p>Login to write comments</p>
            }
            <div className="mt-5">
            {
                comments && comments.map(comment => (
                    <Comment key={comment.id} {...comment} />
                ))
            }
            </div>
        </div>
    )
}