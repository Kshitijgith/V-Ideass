// CreateTeacher.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    qualification: '',
    branch: '',
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = `Bearer ${localStorage.getItem('token')}`;
    try {
        const response = await axios({
            method: 'POST',
            url: 'http://192.168.29.220:3000/admin/create-teacher',
            data: formData,
            headers: { 'Authorization': t }
          });
      setMessage(response.data.message);
      setFormData({
        name: '',
        email: '',
        password: '',
        qualification: '',
        branch: '',
      });
    } catch (error) {
      setMessage('Failed to create teacher. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-100p w-100p bg-blue-300 ">
    <div className='h-10p w-50p flex justify-center items-center font-medium'>
    <h2>Create Teacher</h2>
    </div>
    
    <div className="w-50p h-80p bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ">

{message && <p className="mb-4 text-center text-green-500">{message}</p>}

<form className="w-100p space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="qualification" className="block text-gray-700">Qualification</label>
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="branch" className="block text-gray-700">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Teacher
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTeacher;

