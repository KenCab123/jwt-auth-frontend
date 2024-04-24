import { useEffect, useState } from "react"
import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom"
import "./Questions.css"
import catAudio from '../assets/Cat.mp3'
import lionAudio from '../assets/Lion.mp3'
import monkeyAudio from '../assets/Monkey.mp3'
import pianoAudio from '../assets/Piano.mp3'
import violinAudio from '../assets/Violin.mp3'
import saxophoneAudio from '../assets/Saxophone.mp3'
import holaAudio from '../assets/Hola.mp3'
import graciasAudio from '../assets/Gracias.mp3'
import adiosAudio from '../assets/Adios.mp3'


const URL = import.meta.env.VITE_BASE_URL

export const Questions = () => {
    const [questions, setQuestions] = useState([])
    const {id} = useParams()
    // const [correctAnswer, setCorrectAnswer] = useState('')
    const [correctAnswers, setCorrectAnswers] = useState(['Cat', 'Lion', 'Monkey', 'Piano', 'Violin', 'Saxophone', 'Hola', 'Gracias', 'Adios'])
    const [q1, setQ1] = useState([])
    const [q2, setQ2] = useState([])
    const [q3, setQ3] = useState([])
    const [score, setScore] = useState('0/3')
    const [status, setStatus] = useState({
        user_id: 0,
        quiz_id: 0
    })

    const {user} = useOutletContext()
    const navigate = useNavigate()
    const playSound = (answer) => {
        // console.log(answer)
       // Define audio variables
    let audio;
    
    // Define audio sources (replace these with your actual audio file paths)
    const audioSources = {
        'Cat': catAudio,
        'Lion': lionAudio,
        'Monkey': monkeyAudio,
        'Piano': pianoAudio,
        'Violin': violinAudio,
        'Saxophone': saxophoneAudio,
        'Hola': holaAudio,
        'Gracias': graciasAudio,
        'Adios': adiosAudio
    };

    // Stop any currently playing audio
    if (playSound.currentAudio) {
        playSound.currentAudio.pause();
        playSound.currentAudio.currentTime = 0;
    }

    // Play the new audio
    if (audioSources.hasOwnProperty(answer)) {
        audio = new Audio(audioSources[answer]);
        audio.play();
        playSound.currentAudio = audio;
    }
    };

    const handleClick = (id, e) => {
        if( id === 1 ) setQ1([...q1, e])
        if( id === 2 ) setQ2([...q2, e])
        if( id === 3 ) setQ3([...q3, e])
    }

    const handleSubmit = (id) => {
        let matchCount = 0;
        
        
        for (let i = 0; i < correctAnswers.length; i++) {
            if (id == 1 && q1.includes(correctAnswers[i])) {
                matchCount++;
            }
            if (id == 2 && q2.includes(correctAnswers[i])) {
                matchCount++;
            }
            if (id == 3 && q3.includes(correctAnswers[i])) {
                matchCount++;
            }
        }

        setScore(`${matchCount}/3`);
        setStatus({
            user_id: user.id,
            quiz_id: id
        });
        setQ1([])
        setQ2([])
        setQ3([])


        if(id) {
            fetch(`${URL}/api/status/${user.id}/${id}`, {
                method: "POST",
                body: JSON.stringify(status),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            }).then(res => res.json()).then(data => console.log(data))
            .catch((error) => console.error("catch", error));
        }
    }

    useEffect(() => {
        fetch(`${URL}/api/questions/${id}`).then(res => res.json()).then(data => {
            setQuestions(data)
        })
    }, [id])
    
    const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    // alert('Confirmed!');
    closeModal();
  };

  const handleRetry = () => {
    // alert('Confirmed!');
    //reset score
    setScore("0/3")
    //delete fetch for status
    if(status.quiz_id) {
        fetch(`${URL}/api/status/${user.id}/${status.quiz_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })
        .catch((error) => console.error("catch", error));

    }
    //close modal

    closeModal();
  };



  return (
    <div className="questions">
        <h1>   
            Questions
        </h1>
        {questions.map(q => {
            return (
                <div key={q.id} className="question">
                <h2>{q.text}</h2>
                <button className="play-sound" onClick={() => playSound(q.correct_answer)}>Play Sound</button>
                <div className="questions-options">
                <button onClick={() => handleClick(q.quiz_id, q.option_one)}>{q.option_one}</button>
                <button onClick={() => handleClick(q.quiz_id, q.option_two)}>{q.option_two}</button>
                <button onClick={() => handleClick(q.quiz_id, q.option_three)}>{q.option_three}</button>
                <button onClick={() => handleClick(q.quiz_id, q.option_four)}>{q.option_four}</button>
                </div>
                </div>
            )
        })}
        <div className="quiz-btns">
        <button onClick={() => {handleSubmit(id); openModal()}}>
            Submit
        </button>
        <Link to="/quiz">
            <button>
                Cancel Quiz
            </button>
        </Link>
        </div>
        <div>

      {isOpen && (
        <div className="modal">
          <div className="overlay">
            <div className="modal-content">
            <p>Congratulations! You have scored: {score}</p>
            <button onClick={handleRetry}>Retry</button>
            <Link to={"/quiz"}>
                <button onClick={handleConfirm}>Confirm</button>
            </Link>
            </div>
          </div>
        </div>
      )}
    </div>
        <Link to={"/quiz"} className="home">
            <button>Go Back</button>
        </Link>
    </div>
  )
}
