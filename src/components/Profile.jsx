import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import axios from "axios";

const Profile = () => {
  const [id, setId] = useState("");
  const [data, setData] = useState({});
  const [token, setToken] = useState(null);
  const {user, isLoading} = useUser();

  useEffect(() => {(async() => {

    const userToken = user && await user.getIdToken();
    setToken(userToken);
    console.log(user);
    const response = await axios.get(`http://localhost:8000/api/getProfileID/${user.uid}`, {headers: {authtoken: userToken}});
    
    if(response.data !== 'Failure') {
      const dataRes = response.data;
      setId(dataRes);
      const userData = await axios.get(`http://localhost:8000/getUserProfile/${dataRes}`);
      setData(userData.data);
      
    }
  })();
  }, [id, user])
  return <div>1</div>;
};

export default Profile;
