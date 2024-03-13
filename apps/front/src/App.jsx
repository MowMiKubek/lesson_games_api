import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GameCard from './components/GameCard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CardWrapper from './components/CardWrapper';

function App() {
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
    <div>
      <CardWrapper>
        {
          games.map(element => 
            <GameCard 
                key={element.id}
                name={element.name}
                image={element.image}
                genre={element.genre}
            />
          )
        }
      </CardWrapper>
    </div>
  )
}

export default App
