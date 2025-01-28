import React, { useContext, useEffect, useState } from "react";
import { FaEnvelope, FaUserAlt, FaHeart } from "react-icons/fa";
import "./ProfileInfo.css";
import { AuthContext } from "../../context/AuthContext.js";
import { get } from "../../services/ApiEndpoint.js";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [liked, setLiked] = useState(0);

  useEffect(() => {
    const fetchNoOfLikedRecipes = async () => {
      try {
        const response = await get("api/user/getNoOfLikedRecipes");
        if (response.status === 200) {
          const data = response.data.liked;
          setLiked(data);
        }
      } catch (err) {
        console.log("Error fetching liked recipes:", err);
      }
    };

    if (currentUser) {
      fetchNoOfLikedRecipes();
    }
  }, [currentUser]);

  // Render a loading or placeholder message if `currentUser` is null
  if (!currentUser) {
    return <div className="profile-container">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={currentUser.avatar || "images/user.png"}
            alt="avatar"
            className="avatar"
          />
        </div>
        <h1 className="username">{currentUser.username}</h1>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <FaEnvelope className="icon" />
          <span className="detail-text">{currentUser.email}</span>
        </div>
        <div className="detail-item">
          <FaUserAlt className="icon" />
          <span className="detail-text">
            {currentUser.bio || "No Bio provided"}
          </span>
        </div>
        <div className="detail-item">
          <FaHeart className="icon" />
          <span className="detail-text">{liked || "0"}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
