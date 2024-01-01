import React, { useState } from "react";
import axios from "axios";
import "../styles/homepage.css";
import SearchHotels from "./SearchHotels";

const Home = () => {
  const BASE_URL = "http://localhost:8000";
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseText, setResponseText] = useState("");

  const currencies = {
    "Indian Rupee": "INR",
  };

  const countryList = {
    "India": "IN",
  };

  const stateCodes = {
    "Delhi": "130443",
    "Andhra Pradesh": "134040",
    "Assam": "150162",
    "Bihar": "132429",
    "Chhattisgarh": "133672",
    "Goa": "141578",
    "Gujarat": "141587",
    "Haryana": "100881",
    "Himachal Pradesh": "150171",
    "Jharkhand": "112228",
    "Karnataka": "114986",
    "Kerala": "114823",
    "Madhya Pradesh": "120439",
    "Maharashtra": "144306",
    "Meghalaya": "138670",
    "Mizoram": "110041",
    "Odisha": "110789",
    "Punjab": "121557",
    "Rajasthan": "122175",
    "Sikkim": "146091",
    "Tamil Nadu": "127067",
    "Telangana": "131721",
    "Tripura": "100667",
    "Uttar Pradesh": "141391",
    "Uttarakhand": "121186",
    "West Bengal": "113128",
    "Chandigarh": "114107",
    "Daman and Diu": "116035",
    "Jammu and Kashmir": "150363",
    "Puducherry": "132561"
  };  

  const data = {
    CheckIn: "2024-01-27",
    CheckOut: "2024-01-29",
    HotelCodes: "",
    CityCode: "115936",
    CityName: "Dubai",
    CountryName: "UAE",
    GuestNationality: "AE",
    PreferredCurrencyCode: "USD",
    PaxRooms: [
      {
        Adults: 1,
        Children: 2,
        ChildrenAges: [1, 16],
      },
    ],
    IsDetailResponse: true,
    ResponseTime: 23,
    Filters: {
      MealType: "All",
      Refundable: "all",
      NoOfRooms: 0,
      StarRating: "All",
    },
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/extract-keywords`, {
        prompt: searchTerm,
        stateCodes: stateCodes
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
      <SearchHotels searchData={data} />
    </div>
  );
};

export default Home;
