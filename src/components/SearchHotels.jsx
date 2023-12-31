import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/resultpage.css";

const SearchHotels = () => {
  const BASE_URL = "http://localhost:8000";
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
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
    // Function to make the API call
    const handleSearch = async () => {
      try {
        const response = await axios.post(`${BASE_URL}/get-hotels`, {
          data: data,
        });
        console.log(response.data.data);
        setSearchResults(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // setSearchResults(HotelResult);
    handleSearch();
  }, []);
  if (!searchResults) {
    return <div>Loading...</div>;
  }
  // if (searchResults.Status.Code !== 200)
  //   return <div>{searchResults.Description}</div>;
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
