import { useEffect, useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { Comment } from "./comment";
import Form from "./form";

export default function CommentsContainer({ comments, gameId }) {
    const {isAuthenticated} = useAuth();
    const [users, setUsers] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            if(comments?.length > 0) {
                const userIds = new Set(comments.map(comment => comment.userId));
                const userIdsArray = Array.from(userIds);
                const users = await Promise.all(userIdsArray.map(async userId => {
                    const response = await fetch(`/api/users/${userId}`);
                    const data = await response.json();
                    return data;
                }));
                const usersMap = users.reduce((map, user) => {
                    map[user.id] = user.firstname + ' ' + user.lastname;
                    return map;
                }, {});
                setUsers(usersMap);
                console.log(userIdsArray)
                console.log(usersMap);
                console.log(users)
            }
        }
        fetchData();
    }, [comments]);

    return (
        <div>
            <h3>Comments</h3>
            {
                isAuthenticated
                ? <Form gameId={gameId} />
                : <p>Login to write comments</p>
            }
            <div className="mt-5">
            {
                comments && comments.map(comment => (
                    <Comment key={comment.id} {...comment} users={users} />
                ))
            }
            </div>
        </div>
    )
}