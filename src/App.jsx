import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import ProtectedRoute from "./Components/ProtectedRoute";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import NavBar from "./Components/NavBar";
import Show from "./Components/Show";
import { Questions } from "./Components/Questions";
import  ReviewAddForm  from "./Components/ReviewAddForm";
import  ReviewEditForm  from "./Components/ReviewEditForm";
import LandingPage from "./Components/LandingPage";
import About from "./Components/About";
import { FourOFour } from "./Components/FourOFour";

function App() {
  const navigate = useNavigate();
  const [toggleLogin, setToggleLogin] = useState(false);
  const [reviews, setReviews] = useState([])


  async function handleLogout() {
    localStorage.removeItem("token");

    await setToggleLogin(false);

    navigate("/");
  }

  
  return (
    <>
      <NavBar
        handleLogout={handleLogout}
        toggleLogin={toggleLogin}
        setToggleLogin={setToggleLogin}
      />

      <Routes>
        <Route
          path="/"
          element={<Login setToggleLogin={setToggleLogin} />}
        />
        <Route
          path="/register"
          element={<Register setToggleLogin={setToggleLogin} />}
        />

        <Route element={<ProtectedRoute />}>
          {/* Place protected routes here */}
          <Route
            path="/quiz"
            element={<Dashboard handleLogout={handleLogout} />}
          />
          <Route
            path={`/quiz/:id`}
            element={<Show handleLogout={handleLogout} reviews={reviews} setReviews={setReviews}/>}
          />
          <Route
            path={`/quiz/:id/questions`}
            element={<Questions handleLogout={handleLogout} />}
          />
          <Route
            path={`/quiz/:id/review`}
            element={<ReviewAddForm handleLogout={handleLogout} reviews={reviews} setReviews={setReviews}/>}
          />
          <Route
            path={`/quiz/:id/review/:review_id`}
            element={<ReviewEditForm handleLogout={handleLogout} reviews={reviews} setReviews={setReviews}/>}
          />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </>
  );
}

export default App;
