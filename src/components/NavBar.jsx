import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

const NavBar = () => {
  const userId = "will-get-the-logged-in-userid-here";
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
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
