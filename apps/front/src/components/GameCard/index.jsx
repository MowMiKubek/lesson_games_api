import './card.css';

export default function GameCard({ name, image, genre }) {
    return (
        <div className="game-card">
            <h2>GameCard</h2>
            <p>{name}</p>
            <img src={`/api/assets/${image}`} />
            <p>{genre}</p>
        </div>
    )
}