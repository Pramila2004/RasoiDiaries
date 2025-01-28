import React from "react";
import { FaHome, FaHeart, FaBook, FaUserEdit, FaSignOutAlt,FaUtensils } from "react-icons/fa";
import "../styles/Profile.css";
import MyFavorite from '../components/MyFavorite/MyFavorite.js'
const Profile = () => {
  return (
    <div className="recipes-container">
      <aside className="sidebar">
        <div className="navbar">
          <ul>
            <a href="/profile">
              <li className="menu-item ">
                <FaHome className="menu-icon" /> Home
              </li>
            </a>
            <a href="/liked">
              <li className="menu-item active">
                <FaHeart className="menu-icon" /> Favorite
              </li>
            </a>
            <a href="/myRecipes">
              <li className="menu-item">
                <FaBook className="menu-icon" /> My Recipes
              </li>
            </a>
            <a href="/addRecipe">
              <li className="menu-item">
                <FaUtensils className="menu-icon" /> Add Recipes
              </li>
            </a>
            <a href="/updateProfile">
              <li className="menu-item">
                <FaUserEdit className="menu-icon" /> Update Profile
              </li>
            </a>
          </ul>
        </div>
        <button className="logout-button">
          <FaSignOutAlt className="logout-icon" /> Log Out
        </button>
      </aside>
      <main className="main-content">

        <section>
            <MyFavorite/>
        </section>
      </main>
    </div>
  );
};

export default Profile;
