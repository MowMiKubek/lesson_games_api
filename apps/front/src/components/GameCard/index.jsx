import { Link } from 'react-router-dom';
import './card.css';

export default function GameCard({ id, name, image, genre }) {
    return (
        <div className="game-card">
            <h2>GameCard</h2>
            <p>{name}</p>
            <img src={`/api/assets/${image}`} />
            <p>{genre}</p>
            <Link to={`game/${id}`}>See more &gt;&gt;&gt;</Link>
        </div>
    )
}