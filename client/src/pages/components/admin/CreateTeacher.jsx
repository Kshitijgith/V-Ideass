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
  

  
  
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    genratePassword(8);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const t = `Bearer ${localStorage.getItem('token')}`;
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://v-ideass-1.onrender.com/admin/create-teacher',
        data: formData,
        headers: { Authorization: t },
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
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-100p w-100p bg-blue-300">
      <div className="h-10p w-50p flex justify-center items-center font-medium">
        <h2>Create Teacher</h2>
      </div>

      <div className="w-30p sm:h-60p sm:w-60p h-80p bg-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center">
        {message && <p className="mb-4 text-center text-green-500">{message}</p>}

        <form className="w-100p space-y-4 overflow-y-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder='Enter Teacher Name'
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
              placeholder='Enter Teacher Email'
              required
              className="w-full px-3 py-2 mt-1  text-black border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          
          
          <div className="mb-4">
  <label htmlFor="branch" className="block text-gray-700">Branch</label>
  <select
    name="branch"
    value={formData.branch}
    onChange={handleChange}
    required
    className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="">Select Branch</option>
    <option value="Computer Science">Computer Science</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Electronics and Telecommunication">Electronics and Telecommunication</option>
    <option value="Electronics">Electronics</option>
    <option value="BioMedical">BioMedical</option>
  </select>
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
