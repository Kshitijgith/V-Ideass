// CreateStudent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const CreateStudent = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    password: '',
    rollNo: '',
  });
  
  const [message, setMessage] = useState('');
  const genratePassword=(length)=> {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let Password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      Password += characters[randomIndex];
    }
    setFormData((prevState) => ({
      ...prevState,      
      password:Password,
    }));
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    genratePassword(8)
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
        url: 'https://v-ideass.onrender.com/admin/create-student',
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
      console.log(error)
      setMessage(error.response.data.message);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-100p w-100p bg-blue-300 ">
      <div className='h-10p sm:h-2p  w-50p   sm:w-80p flex justify-center items-center font-medium'>
      <h3>Create Student</h3>
      </div>
      
      <div className="w-50p h-80p sm:w-90p sm:h-80p bg-white rounded-lg shadow-lg p-6 flex flex-col items-center justify-center ">
  
  {message && <p className="mb-4 text-center text-green-500">{message}</p>}
  
  <form className="w-100p space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
    <div>
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
    
    <div>
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
    
    <div>
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
      className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      Create Student
    </button>
  </form>
</div>

    </div>
  );
};

export default CreateStudent;
