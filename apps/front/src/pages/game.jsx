import { useState, useEffect } from "react";
import { useParams } from "react-router";
import CommentsContainer from "../components/CommentsContainer";

export default function GamePage() {
    const { id } = useParams();
    const [game, setGame] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/games/${id}`);

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
            <h2>{game.name}</h2>
            <p>{game.description}</p>
            <hr />
            <section>
                <CommentsContainer comments={game.comments}/>
            </section>
        </div>
    )
}