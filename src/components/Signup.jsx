import React,{useState, useEffect} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import axios from "axios";
import '../styles/login-signup.css'
const Signup = () => {
  
  const [email,setEmail] = useState();
  const [password,setPassword]=useState();
  const [confirmPassword,setConfirmPassword] = useState();
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
    console.log({email,password,confirmPassword});
  }

  const createAccount = async (e) => {
    e.preventDefault();
    try {
      if(!email||!password||!confirmPassword){
        setError("All fields are mandatory")
        return;;
      }
      if (password !== confirmPassword) {
        setError("Password and confirm password do not match");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      
      navigate('/createprofile')
    } catch (e) {
      setError(e.message);
    }
  };
  return(
    <div className="form-div">
    <div className="container-div">
    <div className="title"><h2>Registration</h2></div>
    <div className="content">
      <form className="form" >
        <div className="user-details">
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="abcd@xyz.in" onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="password" placeholder="Confirm your password" onChange={(e)=>setConfirmPassword(e.target.value)} required />
          </div>
        </div>
        {error!==""? <div className="error">*{error}</div>:""}
        <div className="button" onClick={createAccount}>
          <input type="submit" value="Register" />
        </div>
        <p>Already Registered ? <a href="login">Login</a></p>
      </form>
    </div>
  </div></div>
  )
};

export default Signup;
