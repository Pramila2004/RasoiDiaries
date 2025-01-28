import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { FaHome, FaHeart, FaBook, FaUserEdit, FaSignOutAlt,FaUtensils } from "react-icons/fa";
import "../styles/Profile.css";

import ProfileUpdate from "../components/UpdateProfile/UpdateProfile.js";
import { AuthContext } from "../context/AuthContext.js";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  
  if (!currentUser) {
    return navigate("/login");
  }
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
              <li className="menu-item">
                <FaHeart className="menu-icon" /> Favorite
              </li>
            </a>
            <a href="/myRecipes">
              <li className="menu-item">
                <FaBook className="menu-icon" /> My Recipes
              </li>
            </a>
            <a href="addRecipe">
              <li className="menu-item">
                <FaUtensils className="menu-icon" /> Add Recipes
              </li>
            </a>
            <a href="updateProfile">
              <li className="menu-item active">
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
            <ProfileUpdate/>
        </section>
      </main>
    </div>
  );
};

export default Profile;
