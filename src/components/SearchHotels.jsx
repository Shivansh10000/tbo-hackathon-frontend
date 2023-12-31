import React, { useState, useEffect } from "react";
import axios from "axios";
import HotelResult from "./dummy"; //dummy response for temporary use.
import "../styles/resultpage.css";
const SearchHotels = () => {
  const [searchResults, setSearchResults] = useState(null);
  useEffect(() => {
    // Function to make the API call
    const fetchData = async () => {
      try {
        const username = "";
        const password = "";
        const credentials = btoa(username + ":" + password);
        const basicAuth = "Basic " + credentials;
        const apiUrl =
          "http://api.tbotechnology.in/TBOHolidays_HotelAPI/HotelSearch";
        const data = {
          CheckIn: "2024-01-01",
          CheckOut: "2024-01-02",
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
        const response = await axios.post(apiUrl, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth,
          },
        });

        setSearchResults(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); //Not Working
    setSearchResults(HotelResult);
  }, []);
  if (!searchResults) {
    return <div>Loading...</div>;
  }
  if (searchResults.Status.Code !== 200)
    return <div>{searchResults.Description}</div>;
  return (
    <div>
      <h1>Best Hotels Results</h1>
      {searchResults.HotelSearchResults.map((hotel, index) => (
        <div key={index}>
          <h3>{`Hotel Name: ${hotel.HotelInfo.HotelName}`}</h3>
          <img src={hotel.HotelInfo.HotelPicture} alt="img of hotel" />
          <p>{`Description : ${hotel.HotelInfo.HotelDescription}`}</p>
          <p>{`Address : ${hotel.HotelInfo.HotelAddress}`}</p>
          <p>{`Rating : ${hotel.HotelInfo.TripAdvisorRating}`}</p>
          <p>{`Price : ${hotel.MinHotelPrice.TotalPrice} ${hotel.MinHotelPrice.Currency}`}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchHotels;
