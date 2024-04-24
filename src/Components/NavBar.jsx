import { useEffect, useState } from "react";
import "./Navbar.css"

import { Link } from "react-router-dom";

const URL = import.meta.env.VITE_BASE_URL;

const NavBar = ({ toggleLogin, handleLogout }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!toggleLogin) setUser(null);

    if (toggleLogin) {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${URL}/api/auth/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUser(data.user);
            console.log(data.user);
            console.log(toggleLogin);
            
          })
          .catch((error) => console.error("Error fetching user:", error));
      }
    }
  }, []);

  

  return (
    <div className="navbar-container">
        <Link className="logo" to="/">
          <h1>SoundQuiz</h1>
        </Link>

        <ul className="navbar-ul">
            <li>
              <Link to={"/about"}>
                <span>About</span>
              </Link>
            </li>
            <li>
            {toggleLogin ? (
              <Link onClick={handleLogout}>
                  <span>Logout</span>
                </Link>
            ) : (
                <Link to={"/"}>
                  <span>Login</span>
                </Link>
            )}
            </li>
        </ul>

    </div>
  );
};

export default NavBar;
