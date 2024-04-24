import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Reviews } from './Reviews';
import "./Show.css"

const URL = import.meta.env.VITE_BASE_URL;

const Show = ({reviews, setReviews}) => {
  const [quiz, setQuiz] = useState();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${URL}/api/quiz/${id}`).then(res => res.json()).then(data => setQuiz(data));
  }, [id]);


  return (
    <div className='quiz-show'>
      {quiz && (
        <div className='quiz-show-div'>
          <h1>
            {quiz.name}
          </h1>
          <h2>
            Description: {quiz.description}
          </h2>
          <h2>
            Difficulty Level: {quiz.difficulty_lvl}
          </h2>
        </div>
      )}
      <div className='quiz-show-btns'>
      <Link to={`/quiz/${id}/questions`}>
        <button>Get Started</button>
      </Link>
      <Link to="/quiz">
        <button>Cancel</button>
      </Link>
      </div>
      <Reviews reviews={reviews} setReviews={setReviews}/>
      <Link to={"/quiz"} className="home">
        <button >Home</button>
      </Link>
    </div>
  )
}

export default Show