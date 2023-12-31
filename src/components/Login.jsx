import React,{useState} from "react";
import '../styles/login-signup.css'
const Login = () => {
  const [email,setEmail] = useState();
  const [password,setPassword]=useState();
  const [loading,setLoading] = useState(false);
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
            <input type="text" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} required />
          </div>
        </div>
        
        <div className="button">
          <input type="submit" value="Login" />
        </div>
        <p>Not Registered Yet ? <a href="signup">Register</a></p>
      </form>
    </div>
  </div></div>
  )
};

export default Login;
