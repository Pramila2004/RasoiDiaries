import React from "react";
import { FaUserCircle, FaEnvelope, FaUserAlt, FaHeart } from "react-icons/fa";
import "./ProfileInfo.css"; // Add styling as needed

const Profile = () => {
 

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src="images/user.png"
            alt="avatar"
            className="avatar"
          />
        </div>
        <h1 className="username">John Doe</h1>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <FaEnvelope className="icon" />
          <span className="detail-text">njohndoe@gmail.com</span>
        </div>
        <div className="detail-item">
          <FaUserAlt className="icon" />
          <span className="detail-text">No bio provided</span>
        </div>
        <div className="detail-item">
          <FaHeart className="icon" />
          <span className="detail-text">
            10 Liked Recipes
          </span>
        </div>
      </div>
      <div className="follow-section">
        <div className="followers">
          <h3>Followers</h3>
          <p>20</p>
        </div>
        <div className="following">
          <h3>Following</h3>
          <p>30</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
