import React,{useState} from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import '../styles/login-signup.css'
const Signup = () => {
  const [name,setName] = useState();
  const [email,setEmail] = useState();
  const [age , setAge] = useState();
  const [contact,setContact]=useState();
  const [country,setCountry]  = useState();
  const [state,setState] = useState();
  const [password,setPassword]=useState();
  const [confirmPassword,setConfirmPassword] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = ()=>{
    
    setLoading(true);
    console.log({name,email,age,contact,country,state,password,confirmPassword});
    setLoading(false);
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

      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };
  return(
    <div className="form-div">
    <div className="container-div">
    <div className="title"><h2>Registration</h2></div>
    <div className="content">
      <form onSubmit={handleSubmit} >
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
