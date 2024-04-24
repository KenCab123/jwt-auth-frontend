import { Link, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Dashboard.css"
const URL = import.meta.env.VITE_BASE_URL;

const Dashboard = ({ handleLogout }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [statuses, setStatuses] = useState();

  const { user } = useOutletContext(); // Access user data provided by the Outlet's context

  useEffect(() => {
    fetch(`${URL}/api/quiz`).then(res => res.json()).then(data => setQuizzes(data)).catch((error) => console.error(error))

    fetch(`${URL}/api/status`).then(res => res.json()).then(data => setStatuses(data.allStatuses)).catch((error) => console.error(error))
  }, []);



  return (
    <div className="quiz-container">
      <h1>Quizzes</h1>
      <ul>
      {quizzes.map((q) => {
        return (
          <li key={q.id}>
          <Link to={`/quiz/${q.id}`}>
            <h2>{q.name}</h2>
            {statuses && statuses.filter(s => s.user_id === user.id && s.quiz_id === q.id).length > 0 && <h3 className="completed" style={{color: "green"}}>✓</h3>}
          </Link>
          </li>
        )
      })}
      </ul>
      <Link to={"/"} className="landing">
        <button >Home</button>
      </Link>
    </div>
    // <div>
    //   <br />
    //   <br />
    //   <h2>Dashboard Component</h2>

    //   {user && (
    //     <h1>
    //       Welcome, {user.username[0].toUpperCase()}
    //       {user.username.slice(1).toLowerCase()}
    //     </h1>
    //   )}

    //   {/* Use user data as needed, for example: */}

    //   <button onClick={handleLogout}>Logout</button>
    // </div>
  );
};

export default Dashboard;
