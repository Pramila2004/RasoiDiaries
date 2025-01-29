import React, { useContext, useEffect } from "react";
import { FaHome, FaHeart, FaBook, FaUserEdit, FaSignOutAlt,FaUtensils } from "react-icons/fa";
import "../styles/Profile.css";
import MyRecipes from '../components/MyRecipes/MyRecipes.js'
import { post } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import {  useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
 

    useEffect(() => {
      if (!currentUser) {
        return navigate("/login");
      }
    }, [currentUser,navigate]); 
  

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/api/auth/logout");
      if (response.status === 200) {
        toast.success(response.data.message || "Logout successful");
        updateUser(null); // Clear user context
        navigate("/", { replace: true }); // Navigate synchronously
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred during logout");
      console.error("Logout error:", error);
    }
  };
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
              <li className="menu-item active">
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
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="logout-icon" /> Log Out
        </button>
      </aside>
      <main className="main-content">

        <section>
            <MyRecipes/>
        </section>
      </main>
    </div>
  );
};

export default Profile;
