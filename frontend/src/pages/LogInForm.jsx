import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

function LogInForm() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function checkValidation(e, email, password){
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST", 
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    console.log("login successful:", response.data);
    setEmail("");
    setPassword("");
  }
  
  return (
    <div >
      <div className="card p-4 shadow rounded-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Log In</h2>
        <form>
          <div className="mb-3 ">
            <label className="form-label text-start d-block">Email</label>
            <input type="email" className="form-control" placeholder="Enter your email" value={email}
            onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>

          <div className="mb-3">
            <label className="form-label text-start d-block">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password}
            onChange={(e)=>{setPassword(e.target.value)}}/>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3" onClick={(e) => checkValidation(e, email, password)}>
            Log In
          </button>

          <p className="text-center mt-3">
            Don't have an account? <Link to='/signup'>SignUp</Link> 
          </p>
        </form>
      </div>
    </div>
  );
}

export default LogInForm; 