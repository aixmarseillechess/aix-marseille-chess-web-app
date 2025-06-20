import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaEnvelope, FaChess, FaSave, FaCamera } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const { user, updateProfile, uploadProfilePicture, loading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    chessRating: 0,
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        chessRating: user.chessRating || 1200,
      });
      setPreviewImage(user.profilePicture);
    }
  }, [user]);

  // Watch for profile picture changes
  useEffect(() => {
    if (user && user.profilePicture) {
      setPreviewImage(user.profilePicture);
    }
  }, [user?.profilePicture]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile(formData);
  };

  const handleImageUpload = async () => {
    if (profileImage) {
      const result = await uploadProfilePicture(profileImage);
      if (result.success) {
        // Clear the selected file - the preview will be updated by useEffect
        setProfileImage(null);
      }
    }
  };
  
  if (!user) {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
        </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="container">
        <header className="profile-header">
          <h1>My Profile</h1>
          <p>Update your personal details and chess rating.</p>
        </header>

        <div className="profile-grid">
          <aside className="profile-sidebar card">
            <div className="profile-picture-section">
              <div className="profile-picture-wrapper">
                <img
                    src={previewImage || '/default-avatar.svg'}
                    alt="Profile"
                    className="profile-picture"
                />
                <label htmlFor="profile-image-upload" className="profile-picture-overlay">
                    <FaCamera size={24} />
                </label>
              </div>
              <input 
                id="profile-image-upload"
                type="file" 
                accept="image/*"
                onChange={handleImageChange} 
              />
              {profileImage && (
                <button 
                  onClick={handleImageUpload} 
                  className="btn btn-secondary btn-sm" 
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Image'}
                </button>
              )}
            </div>
            <div className="profile-info">
              <h2>{user.firstName} {user.lastName}</h2>
              <p className="username"><FaUser /> @{user.username}</p>
              <p className="email"><FaEnvelope /> {user.email}</p>
            </div>
          </aside>

          <main className="profile-main card">
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="5"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us a bit about your chess journey..."
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="chessRating">
                  <FaChess /> ELO Rating
                </label>
                <input
                  type="number"
                  id="chessRating"
                  name="chessRating"
                  value={formData.chessRating}
                  onChange={handleChange}
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile; 