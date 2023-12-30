import React, { useState } from "react";
import axios from "axios";

const Home = () => {
  const BASE_URL = "http://localhost:8000";
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

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
    <div>
      <h1>Discover Your World</h1>
      <p>What would you like to find today?</p>
      <input
        type="text"
        placeholder="Search here..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {loading ? <p>Loading...</p> : null}
      {responseText && !loading ? <p>{responseText}</p> : null}
    </div>
  );
};

export default Home;
