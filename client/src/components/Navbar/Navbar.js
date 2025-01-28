import React, { useContext } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.js';

export default function Navbar() {
  const { currentUser } = useContext(AuthContext);
 
  return (
      <header className="header">
        <div className="logo">Rasoi Diaries</div>
        <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/search">Recipes</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </nav>
        <div>
          {!currentUser ? (
            <>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/register">
              <button className="login-btn">Signup</button>
            </Link>
            </>
          ):(
            <>
            <Link to="/profile" className="profile-link">
              <div className="profile-info">
                <img src={currentUser.avatar || 'images/user.png'} alt="" className="user-img" />
                <span className="username">{currentUser.username}</span>
              </div>
              <button className="profile-btn">Profile</button>
            </Link>
          </>
          
          )}
          

        </div>
        
      </header>
  );
}
