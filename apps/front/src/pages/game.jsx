import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../lib/AuthContext";

export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState({});
    const {isAuthenticated} = useAuth();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         // pobrać dane z api
    //         // sprawdzić kod odpowiedzi
    //         // zapisać do stanu
    //     }
    //     fetchData();
    // }, []);
    return (
        <div>
            <h2>Game Page {id}</h2>
            <p>Game content</p>
            <hr />
            <section>
                <h3>Comments</h3>
                {
                    isAuthenticated
                    ? 
                    <form action="">
                        <textarea cols="30" rows="10"></textarea>
                        <button type="submit">Submit</button>
                    </form>
                    : <p>Login to write comments</p>
                }
                <div>
                    <p>Comment 1</p>
                    <p>Comment 2</p>
                    <p>Comment 3</p>
                </div>
            </section>
        </div>
    )
}