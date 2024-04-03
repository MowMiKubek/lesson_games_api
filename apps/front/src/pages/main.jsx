import GameCard from '../components/GameCard';
import CardWrapper from '../components/CardWrapper';
import { useState, useEffect } from 'react';

export default function MainPage() {
    const [games, setGames] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch('/api/games');
        const data = await res.json();
        console.log(data)
        setGames(data);
      }
      fetchData();
    }, []);
    return (
        <CardWrapper>
            {
                games.map(element => 
                    <GameCard 
                    key={element.id}
                    name={element.name}
                    image={element.image}
                    genre={element.genre}
                    id={element.id}
                />
            )
            }
        </CardWrapper>
    )
}