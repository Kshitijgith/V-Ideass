// CreateStudent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    password: '',
    branch: '',
    div: '',
    rollNo: '',
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
        url: 'http://192.168.0.105:3000/admin/create-student',
        data: formData,
        headers: { 'Authorization': t }
      });
  
      setMessage(response.data.message || 'Student created successfully!');
      setFormData({
        studentName: '',
        email: '',
        password: '',
        branch: '',
        div: '',
        rollNo: '',
      });
    } catch (error) {
      setMessage('Failed to create student. Please try again.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Student</h2>
        
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentName" className="block text-gray-700">Student Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
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

          <div className="mb-4">
            <label htmlFor="div" className="block text-gray-700">Division</label>
            <input
              type="text"
              name="div"
              value={formData.div}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="rollNo" className="block text-gray-700">Roll No</label>
            <input
              type="text"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateStudent;
