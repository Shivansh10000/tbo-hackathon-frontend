import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import axios from "axios";

const Profile = () => {
  const [id, setId] = useState(null);
  const [data, setData] = useState({});
  const [token, setToken] = useState(null);
  const {user, isLoading} = useUser();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {(async() => {
    if(user) {
      const userToken = user && await user.getIdToken();
      setToken(userToken);
      console.log(user);
      const response = await axios.get(`https://tbo-hackathon-backend.vercel.app/api/getProfileID/${user.uid}`, {headers: {authtoken: userToken}});
      
      if(response.data !== 'Failure') {
        const dataRes = response.data;
        setId(dataRes);
        const userData = await axios.get(`https://tbo-hackathon-backend.vercel.app/getUserProfile/${dataRes}`);
        setData(userData.data);
        setIsReady(true);
      } else {
        setIsReady(true);
      }
  }
  })();
  }, [user, id])
  return <>
  {isReady && 
  <div>
    <div>Name: {data.name}</div>
    <div>Email: {data.email}</div>
    <div>Contact Number: {data.phone_number}</div>
    <div>Age: {data.age}</div>
  </div>
  }
  </>;
};

export default Profile;
