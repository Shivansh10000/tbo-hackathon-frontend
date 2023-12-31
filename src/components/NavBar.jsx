import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { auth } from "..";
import { signOut } from 'firebase/auth';


const NavBar = () => {
  const navigate = useNavigate();
  const userId = "will-get-the-logged-in-userid-here";
  const handleLogout = (e) => {
    e.preventDefault();
    signOut(auth).then(() => {
      navigate('/');
    }).catch((err) => {
      console.log(err.message);
    })
  }

  return (
    <nav className="navbar">
      {" "}
      {/* Apply the CSS class to the nav element */}
      <div>
        <div className="nav-container">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
          <Link to="/searchHotels">Search Hotels</Link>
          {/* Assuming userId is available from somewhere */}
          <Link to={`/profile/${userId}`}>Profile</Link>
          <Link to={`/history/${userId}`}>History</Link>
          <Link onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
