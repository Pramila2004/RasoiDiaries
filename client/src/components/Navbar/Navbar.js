import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
        <button className="login-btn">Login</button>
        <button className="login-btn">Signup</button>
        </div>
        
      </header>
  );
}
