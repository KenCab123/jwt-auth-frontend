import { useEffect, useState } from "react"
import { useOutletContext, useParams, Link, useNavigate } from "react-router-dom"
import "./ReviewForm.css"

const URL = import.meta.env.VITE_BASE_URL

const ReviewEditForm = ({ setReviews, reviews}) => {
    const {user} = useOutletContext()
    const {id, review_id} = useParams()
    const navigate = useNavigate()
    const [updatedReview, setUpdatedReview] = useState({
        content: '',
        rating: 0,
        quiz_id: id,
        user_id: user.id,
        username: user.username
    })

    // console.log(id, review_id)

    useEffect(() => {
        fetch(`${URL}/api/quiz/${id}/reviews/${review_id}`, {
            credentials: "include",
          })
            .then((res) => res.json())
            .then((data) => setUpdatedReview(data.review))
            .catch((error) => console.error(error));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${URL}/api/quiz/${id}/reviews/${review_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            body: JSON.stringify(updatedReview)
        }).then(res => res.json()).then(updatedReviewData => {
            // Update the reviews array with the updated review
            const updatedReviews = reviews.map(review => {
                // If the review id matches the updated review id, replace it with the updated review data
                if (review.id === updatedReviewData.id) {
                    return updatedReviewData;
                }
                // Otherwise, return the original review
                return review;
            });
            // Set the state with the updated reviews array
            setReviews(updatedReviews);
            console.log(updatedReviews)
            
            // Reset the updatedReview state
            setUpdatedReview({
                content: "",
                rating: 0,
                quiz_id: id,
                user_id: user.id,
                username: user.username
            });
        }).catch(error => console.error(error))

        navigate(`/quiz/${id}`)
        
      };
    const handleChange = (e) => {
        setUpdatedReview({
            ...updatedReview,
            [e.target.id]: e.target.value
        })
        
      };


  return (
    <div className="form">
        <h1>Edit your review</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="content"></label>
            <input 
            type="text" 
            id="content"
            required
            value={updatedReview.content}
            onChange={handleChange}
            placeholder="Click here to enter text."
             />
            <label htmlFor="rating"></label>
            <input 
            type="number" 
            id="rating"
            value={updatedReview.rating}
            min="1"
            max="5"
            step="1"
            onChange={handleChange}
            required
             />
            <button>Submit</button>
        </form>
        <Link to={`/quiz/${id}`}>
            <button>Cancel</button>
        </Link>
    </div>
  )
}


export default ReviewEditForm