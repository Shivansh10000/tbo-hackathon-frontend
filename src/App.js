import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import NavBar from "./components/NavBar"; // Import NavBar component
import Login from "./components/Login"; // Import Login component
import Signup from "./components/Signup"; // Import Signup component
import SearchHotels from "./components/SearchHotels"; // Import SearchHotels component
import Profile from "./components/Profile"; // Import Profile component
import History from "./components/History"; // Import History component

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/searchHotels" element={<SearchHotels />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/history/:userId" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
