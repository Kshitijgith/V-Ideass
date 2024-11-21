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
    <div className="h-100p w-100p flex flex-col justify-center items-start sm:items-center bg-red-100 overflow-y-auto">
  {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

  <div className="flex flex-wrap h-90p w-90p">
    {groupInfo && groupInfo.length > 0 && groupInfo.map((group, index) => (
      <Link 
      to="GroupActionsT" 
      state={{ groupId: group.groupId }} // Pass groupId in the state
      key={index} className="w-1/4 sm:w-100p sm:h-80p p-4 ">

        <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full sm:h-100p sm:w-100p">
        <div className='sm:h-8p h-20p w-100p  flex items-center justify-center'>
        <strong className="font-bold text-2xl text-center">
        {group.projectName.length < 20
    ? group.projectName 
    : `${group.projectName.slice(0, 20)}...`}
        </strong>
 
</div>

         
          <div className="h-40p w-100p flex justify-center  ">
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
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Group ID:</strong> {group.groupId}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Members:</strong> {group.groupMembers.slice(0, 2).join(', ')}
          {group.groupMembers.length > 2 && '...'}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Leader:</strong> {group.groupLeader}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Guide Name:</strong> {group.guideName}</p>
          <p className="text-gray-700 mb-1"><strong className="font-semibold">Year:</strong> {group.year}</p>
         
        </div>
      </Link>
    ))}
  </div>

  {!groupInfo.length && !error && <p className="text-gray-500">No group information available.</p>}
</div>

  );
};

export default FetchGroupsT;