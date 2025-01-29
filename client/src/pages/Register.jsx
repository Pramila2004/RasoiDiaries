import React, { useState } from "react";
import "../styles/Login.css";

import { post } from '../services/ApiEndpoint.js';
import {toast} from 'react-hot-toast'



const Register = () => {
  const[username,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const handlesubmit=async(e)=>{

      e.preventDefault()
      try {
          const request=await post('/api/auth/register',{username,email,password})
          const response=request.data;
          if (request.status === 200) {
              toast.success(response.message || 'Register successful');
              e.target.reset();
          }
      } catch (error) {
          toast.error(
              error.response?.data?.message || 'An error occurred during register'
          );
          console.log(error)
      }

  }
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label>User Name</label>
            <input type="text" placeholder="Enter user name" required onChange={(e)=>setName(e.target.value)}  />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
