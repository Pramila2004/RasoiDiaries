import React, { useState } from "react";
import "./UpdateProfile.css";

const UserProfileForm = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    avatar: null,
  });

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, avatar: e.target.result }); // Convert file to base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setUser({ ...user, avatar: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="user-profile-form">
      <h2>Update Profile</h2>

      <div className="form-section">
        <div className="avatar-section">
          <img
            src={user.avatar || "images/add_avatar.jpeg"}
            alt="Avatar" onClick={handleRemoveAvatar}
          />
        </div>
      </div>

      <div className="form-section">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          placeholder="Enter your username"
        />
      </div>

      <div className="form-section">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
        />
      </div>

        
        <div className="form-section">
        <label>Bio</label>
        <textarea
          value=""
          placeholder="Add a bio"
        />
      </div>
        

      <div className="form-section">
        <button type="button" className="save-button">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserProfileForm;
