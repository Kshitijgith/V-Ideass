import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateProfile = () => {
  const location = useLocation();
  const {Email} = location.state||0 // Assuming the email is passed through state

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert('New passwords do not match!');
      return;
    }

    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (!token) {
      alert('No authentication token found!');
      return;
    }

    try {
      const response = await axios.post(
        'https://v-ideass.onrender.com/student/Update-profile',
        { Email, oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password.');
    }
  };

  return (
    <div className="h-100p w-100p  flex flex-col justify-center items-center">
      
      <form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center sm:h-60p sm:w-80p justify-center bg-white shadow-lg rounded-lg p-8 w-96 mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Password</h2>

      <input
        type="password"
        placeholder="Enter old password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        required
      />

      <div className="relative w-full mb-4">
        <input
          type={showNewPassword ? "text" : "password"} // Toggle between text and password type
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="button"
          onClick={() => setShowNewPassword(!showNewPassword)} // Toggle show password state
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
        >
          {showNewPassword ? "Hide" : "Show"}
        </button>
      </div>

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        required
      />

      <button 
        type="submit" 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg w-full transition duration-300"
      >
        Update Password
      </button>
    </form>

    </div>
  );
};

export default UpdateProfile;
