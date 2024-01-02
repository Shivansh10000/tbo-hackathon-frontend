import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/resultpage.css";

const SearchHotels = ({ searchData }) => {
  const BASE_URL = "https://tbo-hackathon-backend.vercel.app";
  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/get-hotels`, {
          data: searchData,
        });
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleSearch();
  }, [searchData]);

  if (!searchResults) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      {searchResults.map((hotel, index) => (
        <div className="hotel-card" key={index}>
          <h2 className="hotel-name">{hotel.HotelInfo.HotelName}</h2>
          <img
            className="hotel-image"
            src={hotel.HotelInfo.HotelPicture}
            alt={hotel.HotelInfo.HotelName}
          />
          <p className="hotel-description">
            {hotel.HotelInfo.HotelDescription}
          </p>
          <p className="hotel-address">
            Address: {hotel.HotelInfo.HotelAddress}
          </p>
          <p className="hotel-rating">
            Rating: {hotel.HotelInfo.TripAdvisorRating}
          </p>
          <p className="hotel-price">
            Price: {hotel.MinHotelPrice.TotalPrice}{" "}
            {hotel.MinHotelPrice.Currency}
          </p>
          <hr className="separator" />
        </div>
      ))}
    </div>
  );
};

export default SearchHotels;
