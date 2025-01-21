import React, { useContext } from "react";
import { FaHome, FaHeart, FaBook, FaUserEdit, FaSignOutAlt,FaUtensils } from "react-icons/fa";
import "../styles/Profile.css";
import ProfileInfo from '../components/ProfileInfo/ProfileInfo.js'
import { useNavigate } from 'react-router-dom';
import { post } from "../services/ApiEndpoint.js";
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.js';

const Profile = () => {
  const navigate = useNavigate();
  const {  updateUser } = useContext(AuthContext);

  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/logout');
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message || 'Logout successful');
        updateUser(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during logout');
      console.error('Logout error:', error);
    }
  };
  return (
    <div className="recipes-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <a href="/profile">
              <li className="menu-item active">
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
        </nav>
        <button onClick={handlelogout} className="logout-button">
          <FaSignOutAlt className="logout-icon" /> Log Out
        </button>
      </aside>
      <main className="main-content">

        <section>
            <ProfileInfo/>
        </section>
      </main>
    </div>
  );
};

export default Profile;
