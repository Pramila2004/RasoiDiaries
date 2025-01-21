import React, { useContext, useState } from "react";
import "../styles/Login.css";

import { useNavigate } from "react-router-dom";
import { post } from '../services/ApiEndpoint';
import {toast} from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext';



const Login = () => {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {updateUser}=useContext(AuthContext)
  const navigate = useNavigate();

    const handlesubmit=async(e)=>{
        e.preventDefault()
     
      try {
            const request=await post('/api/auth/login',{email,password})
            const response=request.data;
            

            if (request.status === 200) {
                toast.success(response.message || 'Login successful');
                console.log("On login page")
                updateUser(response.user)
                navigate("/");
            }

        } catch (error) {
            toast.error(
            error.response?.data?.message || 'An error occurred during login');
            console.error('Login error:', error);
      }
    }


  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handlesubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
