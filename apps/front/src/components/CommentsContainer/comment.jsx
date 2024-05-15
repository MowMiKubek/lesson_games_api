import { FaRegStar } from "react-icons/fa6"; // empty
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6"; // full

export function Comment({ content, rating, userId, createdAt }) {
    const fullStars = Math.floor(rating);
    const emptyStars = Math.floor(5 - rating);
    return (
        <div class="card text-start">
            <div className="card-body">
                <h5 class="card-title d-flex justify-content-between">
                    <p>User id: {userId}</p>
                    <p>            
                        {[...Array(fullStars)].map(() => <FaStar />)}         
                        {   
                            fullStars + emptyStars !== 5 && <FaRegStarHalfStroke />
                        }
                        {[...Array(emptyStars)].map(() => <FaRegStar />)}      
                    </p>
                </h5>
                <h6 class="card-subtitle mb-2 text-muted">{createdAt.slice(0, 10)}</h6>
                <p class="card-text">{content}</p>
            </div>
        </div>
    )
}