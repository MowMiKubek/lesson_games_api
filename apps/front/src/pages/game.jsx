import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../lib/AuthContext";

export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState({});
    const {isAuthenticated} = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/games');

            const status = response.status;
            const data = await response.json();

            if(200 <= status && status <= 299) {
                console.log(data);
                setGame(data);

            } else if(400 <= status && status <= 499) {
                alert('Błąd pobania danych');
            }

        }
        fetchData();
    }, []);
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