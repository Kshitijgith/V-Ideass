import React, { useState } from 'react';
import axios from 'axios';

const CreateGroup = () => {
  const [formData, setFormData] = useState({
    groupId: '',
    groupMembers: [],
    guideName: '',
    year: '',
  });

  const [newMember, setNewMember] = useState(''); // For adding members
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddMember = () => {
    if (newMember.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        groupMembers: [...prevData.groupMembers, newMember],
      }));
      setNewMember('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const t = `Bearer ${localStorage.getItem('token')}`;

    // Automatically set groupLeader as the first member in groupMembers
    const groupData = {
      ...formData,
      groupLeader: formData.groupMembers[0] || '',
    };

    try {
      const response = await axios({
        method: 'POST',
        url: 'https://v-ideass-1.onrender.com/teacher/create-group',
        data: groupData,
        headers: { 'Authorization': t },
      });

      setMessage(response.data.message || 'Group created successfully!');
      setFormData({
        groupId: '',
        groupMembers: [],
        guideName: '',
        year: '',
      });
    } catch (error) {
      setMessage('Failed to create group. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center h-100p w-100p overflow-y-auto  ">
      <div className="w-40p h-90p sm:w-90p sm:h-80p bg-white rounded-lg shadow-lg flex flex-col  items-center justify-center">
        <div className='sm:h-10p sm:w-100p'></div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">Create Project Group</h2>
        <div className='sm:h-8p sm:w-100p'></div>
        
        {message && <p className="mt-4 text-center text-green-500">{message}</p>}
        
        <form className="h-90p w-80p rounded-lg " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="groupId" className="block text-gray-700 ">Group ID</label>
            <input
              type="text"
              name="groupId"
              value={formData.groupId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 rounded border border-gray-300 focus:outline focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          

          <div className="mb-4">
            <label htmlFor="year" className="block text-gray-700">Year</label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 text-gray-700 rounded border border-gray-300 focus:outline focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="groupMembers" className="block text-gray-700">Group Members</label>
            <input
              type="text"
              name="newMember"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-gray-700 rounded border border-gray-300 focus:outline focus:outline-indigo-500 focus:ring-2 focus:ring-indigo-500"
              placeholder="Add a group member"
            />
            <button
              type="button"
              onClick={handleAddMember}
              className="px-4 py-2 mt-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Member
            </button>
            <div className="mt-2">
              {formData.groupMembers.map((member, index) => (
                <span key={index} className="inline-block px-2 py-1 mr-2 text-white bg-gray-500 rounded-full">
                  {member}
                </span>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create Project Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
