import React, { useState, useEffect } from "react";
import useUser from "../hooks/useUser";

import axios from "axios";
import "../styles/homepage.css";

const Home = () => {
  const BASE_URL = "http://localhost:8000";
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const [id, setId] = useState(null);
  const [historyData, setHistoryData] = useState({});
  const [token, setToken] = useState(null);
  const {user, isLoading} = useUser();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {(async() => {
    if(user) {
      const userToken = user && await user.getIdToken();
      setToken(userToken);
      console.log(user);
      const response = await axios.get(`http://localhost:8000/api/getHistoryID/${user.uid}`, {headers: {authtoken: userToken}});
      
      if(response.data !== 'Failure') {
        const dataRes = response.data;
        setId(dataRes);
        const userData = await axios.get(`http://localhost:8000/getUserHistory/${dataRes}`);
        setHistoryData(userData.data);
        setIsReady(true);
      } else {
        setIsReady(true);
      }
  }
  })();
  }, [user, id])

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/extract-keywords`, {
        prompt: searchTerm,
      });

      setResponseText(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state if needed
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="main-heading">Discover Your World</h1>
      <p className="sub-heading">What would you like to find today?</p>
      <input
        type="text"
        className="search-input"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
      {loading ? <p className="loading">Loading...</p> : null}
      {responseText && !loading ? (
        <p className="response-text">{responseText}</p>
      ) : null}

      {/* {isReady && historyData.firebase_id} */}
    </div>
  );
};

export default Home;
