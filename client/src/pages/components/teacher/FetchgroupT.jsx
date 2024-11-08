import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
const FetchGroupsT = () => {
  
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
        url: `http://192.168.29.220:3000/teacher/find-group`, // Use the email in the route
        headers: {
          'Authorization': t
        }
      });

      if (response.data.success) {
        setGroupInfo(response.data.data);
      } else {
        setError('Failed to fetch group information.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Not Part of any Group');
      } else if (err.response && err.response.status === 401) {
        setError('Not Authorized');
      } else {
        console.error('Error fetching groups:', err);
      }
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [])
  

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-start bg-red-100 overflow-y-auto">
  {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

  <div className="flex flex-wrap h-100p w-100p">
    {groupInfo && groupInfo.length > 0 && groupInfo.map((group, index) => (
      <Link 
      to="GroupActionsT" 
      state={{ groupId: group.groupId }} // Pass groupId in the state
      key={index} className="w-1/4 p-4 mt-4">

        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Group Information</h2>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Group ID:</strong> {group.groupId}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Members:</strong> {group.groupMembers.join(', ')}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Leader:</strong> {group.groupLeader}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Guide Name:</strong> {group.guideName}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Year:</strong> {group.year}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Status:</strong> {group.status ? 'Active' : 'Inactive'}</p>
        </div>
      </Link>
    ))}
  </div>

  {!groupInfo.length && !error && <p className="text-gray-500">No group information available.</p>}
</div>

  );
};

export default FetchGroupsT;