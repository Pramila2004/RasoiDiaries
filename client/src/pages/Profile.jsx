import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaHeart,
  FaBook,
  FaUserEdit,
  FaSignOutAlt,
  FaUtensils,
} from "react-icons/fa";
import "../styles/Profile.css";
import ProfileInfo from "../components/ProfileInfo/ProfileInfo";
import { post } from "../services/ApiEndpoint";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
 

    useEffect(() => {
      if (!currentUser) {
        return navigate("/login");
      }
    }, []); 
  

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
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item active")}
            >
              <li>
                <FaHome className="menu-icon active" /> Home
              </li>
            </NavLink>
            <NavLink
              to="/liked"
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
            >
              <li>
                <FaHeart className="menu-icon" /> Favorite
              </li>
            </NavLink>
            <NavLink
              to="/myRecipes"
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
            >
              <li>
                <FaBook className="menu-icon" /> My Recipes
              </li>
            </NavLink>
            <NavLink
              to="/addRecipe"
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
            >
              <li>
                <FaUtensils className="menu-icon" /> Add Recipes
              </li>
            </NavLink>
            <NavLink
              to="/updateProfile"
              className={({ isActive }) => (isActive ? "menu-item active" : "menu-item")}
            >
              <li>
                <FaUserEdit className="menu-icon" /> Update Profile
              </li>
            </NavLink>
          </ul>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="logout-icon" /> Log Out
        </button>
      </aside>
      <main className="main-content">
        <section>
          <ProfileInfo />
        </section>
      </main>
    </div>
  );
};

export default Profile;
