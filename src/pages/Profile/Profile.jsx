import React, { useState } from 'react';
import API from "../../services/api";
import './Profile.css';

function Profile({ setCurrentPage }) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const [name, setName] = useState(userInfo.name || '');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const { data } = await API.put('/users/profile', { name });
      const updatedInfo = { ...userInfo, name: data.name };
      localStorage.setItem('userInfo', JSON.stringify(updatedInfo));
      setMessage('Profile updated successfully!');
      setLoading(false);
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || 'Failed to update profile.');
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>My Reader Profile</h2>
      
      {message && (
        <div className={`profile-message ${isError ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      <form onSubmit={handleUpdateProfile} className="add-book-form" style={{ marginTop: '1.25rem' }}>
        <div className="form-group">
          <label>Username / Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required
          />
        </div>

        <div className="form-group">
          <label>Email Address (Read-only)</label>
          <input 
            type="email" 
            value={userInfo.email || ''} 
            disabled 
          />
        </div>

        <div className="form-group">
          <label>Subscription Status</label>
          <div className="profile-meta-card">
            {userInfo.isSubscribed ? "⭐ Premium Member (Unlimited Reader Access)" : "Standard Reader (Free Tier)"}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={() => setCurrentPage('home')}
          >
            ← Back to Library
          </button>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Saving..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;