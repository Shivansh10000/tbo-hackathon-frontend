import React,{useState, useEffect} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import '../styles/login-signup.css'
const CreateProfile = () => {
const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [age , setAge] = useState();
  const [contact,setContact]=useState();
  const [country,setCountry]  = useState();
  const [state,setState] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const {user, isLoading} = useUser();
  const [token, setToken] = useState(null);

  useEffect(() => {(async() => {

    const userToken = user && await user.getIdToken();
    setToken(userToken);
  })();
  }, [user]);

  const handleSubmit = (evt)=>{
    evt.preventDefault();
    setLoading(true);
    console.log({name,email,age,contact,country,state});
    setLoading(false);
  }


  const createAccount = async (e) => {
    e.preventDefault();
    try {
      if(!email){
        setError("All fields are mandatory")
        return;;
      }
      
      const formData = {
        firebase_id: user.uid,
        name: name,
        email: email,
        age: age,
        country: country,
        state: state,
        phone_number: contact
      };
    
      const config = {
        headers: {
          'Authtoken': token,
        },
      }
      await axios.post("http://localhost:8000/createProfile", formData, config);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <div className="form-div">
    <div className="container-div">
    <div className="title"><h2>Create Profile</h2></div>
    <div className="content">
      <form className="form" >
        <div className="user-details">
          <div className="input-box">
            <span className="details">Full Name</span>
            <input type="text" placeholder="Enter your name" onChange={(e)=>setName(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Age</span>
            <input type="number" placeholder="Enter your age" onChange={(e)=>setAge(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="abcd@xyz.in" onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Phone Number</span>
            <input type="text" placeholder="Enter your number" onChange={(e)=>setContact(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Country</span>
            <input type="text" placeholder="Your Country Name" onChange={(e)=>setCountry(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">State</span>
            <input type="text" placeholder="State" onChange={(e)=>setState(e.target.value)} required />
          </div>
        </div>
        {error!==""? <div className="error">*{error}</div>:""}
        <div className="button" onClick={createAccount}>
          <input type="submit" value="Create Profile" />
        </div>
        
      </form>
    </div>
  </div></div>
  )
}

export default CreateProfile
