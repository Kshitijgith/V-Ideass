import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
const FetchGroups = () => {
  
  const [groupInfo, setGroupInfo] = useState([]);
  const [error, setError] = useState('');
  const [group, setgroup] = useState('');
  
  const set =(val)=>{
    setgroup(val);
    console.log(group);
  
  }
  
   // Only run once on component mount

  const fetchGroups = async () => {
    try {
      const t = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios({
        method: 'POST',
        url: `https://v-ideass-1.onrender.com/student/find-group`, // Use the email in the route
        headers: {
          'Authorization': t
        }
      });

      if (response.data.success) {
        // console.log(typeof(response.data.data));
        setGroupInfo(response.data.data);
      } else {
        setError('Failed to fetch group information.');
      }
    } catch (err) {
      setError(err.response.data.message)
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [])
  

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-center sm:items-center overflow-y-auto">
      
  {groupInfo.length > 0 ? (
    <div className="flex   h-100p w-100p flex-wrap justify-around overflow-y-auto">
      <div className='h-10p w-100p'></div>
       {groupInfo.map((group, index) => (
    <Link
      to="GroupActions"
      state={{ groupId: group.groupId }} // Pass groupId in the state
      key={index}
      className="w-30p h-80p   sm:w-80p sm:h-80p"
    >
      <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 lg:h-[400px] sm:h-90p flex flex-col justify-between">
        
        <div className="sm:h-8p  flex items-center justify-center">
          <strong className="font-bold text-2xl text-center truncate">
            {group.projectName || 'No Project Name'}
          </strong>
        </div>

        <div className="h-40p w-100p flex justify-center items-center">
          {group.photos && group.photos.length > 0 ? (
            <img
              src={group.photos[0]}
              alt="Project photo"
              className="w-90p h-90p rounded-md object-cover"
            />
          ) : (
            <p className="text-gray-700">No photos available</p>
          )}
        </div>

        <div className="flex-grow flex flex-col justify-between">
          <p className="text-gray-700 mb-1">
            <strong className="font-semibold">Group ID:</strong> {group.groupId}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-semibold">Group Members:</strong> {group.groupMembers.slice(0, 2).join(', ')}
            {group.groupMembers.length > 2 && '...'}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-semibold">Group Leader:</strong> {group.groupLeader}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-semibold">Guide Name:</strong> {group.guideName}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-semibold">Year:</strong> {group.year}
          </p>
          <p className="text-gray-700 mb-1">
            <strong className="font-semibold">Status:</strong> {group.status ? 'Active' : 'Inactive'}
          </p>
        </div>
      </div>
    </Link>
  ))}
<div className='h-20p w-100p'></div>
    </div>
  ) : (
    <div className="h-100p w-100p flex justify-center items-center">
      <div className="h-50p w-50p flex space-x-2 justify-center items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
      </div>
    </div>
  )}
</div>

 
  
)};
export default FetchGroups;
