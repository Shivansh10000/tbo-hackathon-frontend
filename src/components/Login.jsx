import React,{useState} from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import '../styles/login-signup.css'
const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword]=useState();
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const logIn = async (e) => {
    e.preventDefault();
    try {
      if(!email||!password){
        setError("All fields are mandatory");
        return;
      }
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  const handleSubmit = ()=>{
    setLoading(true);
    console.log({email,password});
    setLoading(false);
  }
  return(
    <div className="form-div">
    <div className="container-div">
    <div className="title"><h2>Login</h2></div>
    <div className="content">
      <form onSubmit={handleSubmit} >
        <div className="user-details">
          <div className="input-box">
            <span className="details">Email</span>
            <input type="email" placeholder="abcd@xyz.in" onChange={(e)=>setEmail(e.target.value)} required />
          </div>
          <div className="input-box">
            <span className="details">Password</span>
            <input type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
          </div>
        </div>
        {error!==""? <div className="error">*{error}</div>:""}
        <div className="button" onClick={logIn}>
          <input type="submit" value="Login" />
        </div>
        <p>Not Registered Yet ? <a href="signup">Register</a></p>
      </form>
    </div>
  </div></div>
  )
};

export default Login;
