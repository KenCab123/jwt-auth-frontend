import { useState } from "react"
import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom"
import "./ReviewForm.css"

const URL = import.meta.env.VITE_BASE_URL

const ReviewAddForm = ({reviews, setReviews}) => {
    const {id} = useParams()
    const { user } = useOutletContext();
    const navigate = useNavigate()
    const [newReview, setNewReview] = useState({
        content: '',
        rating: 0,
        quiz_id: parseInt(id),
        user_id: user.id,
        username: user.username
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(newReview.content.length > 0 && newReview.rating > 0) {
            fetch(`${URL}/api/quiz/${id}/reviews`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(newReview)
            }).then(res => res.json()).then(data => setReviews(data, ...reviews)).then(() => navigate(`/quiz/${id}`))
        }
        
    }

    const handleChange = (e) => {
        setNewReview({
            ...newReview,
            [e.target.id]: e.target.value
        })
    }

  return (
    <div className="form">
        <h1>Enter a review</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="content"></label>
            <input 
            type="text" 
            id="content"
            required
            value={newReview.content}
            onChange={handleChange}
            placeholder="Click here to enter text."
            />
            <label htmlFor="rating"></label>
            <input 
            type="number" 
            id="rating"
            value={newReview.rating}
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

export default ReviewAddForm