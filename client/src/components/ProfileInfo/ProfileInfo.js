import React, { useContext } from "react";
import {  FaEnvelope, FaUserAlt, FaHeart } from "react-icons/fa";
import "./ProfileInfo.css"; // Add styling as needed
import { AuthContext } from "../../context/AuthContext.js";

const Profile = () => {
 
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={currentUser.avatar}
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
          <span className="detail-text">{currentUser.bio || "No Bio provided"}</span>
        </div>
        <div className="detail-item">
          <FaHeart className="icon" />
          <span className="detail-text">
          {currentUser.likedRecipes.length || '0'}
          </span>
        </div>
      </div>
      <div className="follow-section">
        <div className="followers">
          <h3>Followers</h3>
          <p>{currentUser.followers.length || '0'}</p>
        </div>
        <div className="following">
          <h3>Following</h3>
          <p>{currentUser.following.length || '0'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
