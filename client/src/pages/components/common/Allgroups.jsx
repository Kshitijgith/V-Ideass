import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const FetchAll = () => {
  const [groupInfo, setGroupInfo] = useState([]);
  const [error, setError] = useState('');
  
  
  

  const fetchGroups = async () => {
    try {
      
      const response = await axios({
        method: 'POST',
        url: `http://192.168.29.220:3000/all/all-groups`, 
    
      })

      if (response.data.success) {
        setGroupInfo(response.data.data);
      } else {
        setError('Failed to fetch group information.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Not Part of any Group');
      } else {
        console.error('Error fetching groups:', err);
      }
    }
  };
  useEffect(() => {
    fetchGroups();
  }, [])
  

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-start overflow-y-auto">
  {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}
  <div className="flex flex-wrap h-100p w-100p">
    {groupInfo && groupInfo.length > 0 && groupInfo.map((group, index) => (
      <Link 
      to="EachGroup" 
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

export default FetchAll;