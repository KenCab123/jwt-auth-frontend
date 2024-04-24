import { useEffect, useState } from "react"
import { useParams, Link, useOutletContext } from "react-router-dom";
import "./Reviews.css"
const URL = import.meta.env.VITE_BASE_URL;

export const Reviews = ({reviews, setReviews}) => {
    const {user} = useOutletContext()
    const {id} = useParams()

    const handleDelete = (review_id) => {
        if (confirm(`Are you sure you want to delete your review?`)) {
            fetch(`${URL}/api/quiz/${id}/reviews/${review_id}`, {
              method: "DELETE",
              credentials: "include",
            })
              .then((response) => response.json())
              .then((data) => {
                const updatedReviews = reviews.filter((review) => review.id !== review_id);
                setReviews(updatedReviews);
              })
              .catch((error) => console.error(error));
          }
    }

    useEffect(() => {
            fetch(`${URL}/api/quiz/${id}/reviews`).then(res => res.json()).then(data => setReviews(data.allReviews))

    }, [id, setReviews])

  return (
    <div className="review-container">
        <h3>Reviews:</h3>
        <Link to={`/quiz/${id}/review`} className="add-review">
            <button>Add a Review</button>
        </Link>
        {reviews && reviews.length > 0 && reviews.map((review) => {
            return (
                <div key={review.id} className="review">
                    <h5>{review.username[0].toUpperCase() + review.username.slice(1)} says:</h5>
                    <h4>{review.content}</h4>
                    <h4>Rating: {review.rating}</h4>
                    {user && user.username === review.username && 
                     <div className="user-review-btns">
                        <Link to={`/quiz/${id}/review/${review.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(review.id)}>Delete</button>
                     </div>
                    }
                </div>
            )
        })}
    </div>

  )
}

