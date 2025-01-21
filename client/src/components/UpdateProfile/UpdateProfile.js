import React, { useContext, useState } from "react";
import { AuthContext } from '../../context/AuthContext.js';
import { put } from '../../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';
import "./UpdateProfile.css";
import UploadWidget from '../uploadWidget/uploadWidget.js';

const UserProfileForm = () => {
  const {currentUser, updateUser } = useContext(AuthContext);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [bio, setBio] = useState(currentUser?.bio || 'No Bio');
  const [avatar, setAvatar] = useState(currentUser?.avatar);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await put('/api/user/update', {username,email,bio,avatar,});
      console.log('avatar : ',avatar)
      if (response.status === 200) {
        toast.success(response.data.message || "Profile updated successfully!");
        updateUser(response.data.user);
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "An error occurred while updating your profile.");
    }
  };

  return (
    <div className="user-profile-form">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-section">
          <div className="avatar-section">
            <img src={avatar} alt="Avatar" className="avatar-preview" />
          </div>
          <UploadWidget
            uwConfig={{
              cloudName: 'dpqnyim8p',
              uploadPreset: 'rasoi-diaries',
              folder: 'avatar',
            }}
            setAvatar={setAvatar}
          />
        </div>

        <div className="form-section">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>

        <div className="form-section">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-section">
          <label>Bio</label>
          <textarea
            value={bio}
            placeholder="Add a bio"
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="form-section">
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileForm;
