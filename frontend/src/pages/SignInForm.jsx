import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LogInForm from "./LogInForm";
import axios from "axios";

 function SigninForm() {
    const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  async function checkValidation(e, email, password){
    e.preventDefault();

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ email, password }), 
    });

    const data = await response.json();
    console.log(data);
    

    console.log("Signup successful:", response.data);
    setEmail("");
    setPassword("");
  }
  return (
    <div >
      <div className="card p-4 shadow rounded-4 shadow-lg" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Sign Up</h2>
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
            Sign Up
          </button>

          <p className="text-center mt-3">
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SigninForm; 