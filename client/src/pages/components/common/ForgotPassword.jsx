import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleSendResetLink = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.29.220:3000/admin/Forgot-Password', { role, email });
      alert('Reset link sent successfully!');
    } catch (error) {
      console.error('Error sending reset link:', error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="h-100p w-100p  bg-gradient-to-r from-blue-100 to-blue-200 flex flex-col overflow-y-auto items-center justify-center">
  <h2 className="text-3xl font-extrabold text-black mb-6 shadow-sm">Forgot Password</h2>
  <form
    onSubmit={handleSendResetLink}
    className="flex flex-col items-center bg-white h-70p sm:w-80p sm:h-50p shadow-2xl rounded-lg w-40p p-8"
  >
    <div className="mb-6 w-full">
      <label
        className="block text-gray-800 font-semibold mb-2 text-lg"
        htmlFor="role"
      >
        Select Role
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 text-lg border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      >
        <option value="" disabled>Select your role</option>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
      </select>
    </div>

    <div className="mb-6 w-full">
      <label
        className="block text-gray-800 font-semibold mb-2 text-lg"
        htmlFor="email"
      >
        Enter Email
      </label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full p-3 text-lg border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
        required
      />
    </div>

    <button
      type="submit"
      className="bg-blue-700 text-white py-3 px-8 text-lg font-bold rounded shadow-md hover:shadow-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 transition duration-300"
    >
      Send Reset Link
    </button>
  </form>
</div>

  );
};

export default ForgotPassword;

