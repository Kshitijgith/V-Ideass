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
    <div className="h-100p w-100p flex flex-col justify-center items-start overflow-y-auto  bg-red-100">
     
     {groupInfo && groupInfo.length > 0 ? (
  <>
    {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}
    <div className="flex flex-wrap h-100p w-100p">
      {groupInfo.map((group, index) => (
        <Link 
          to="EachGroup" 
          state={{ groupId: group.groupId }} // Pass groupId in the state
          key={index} 
          className="w-1/4 p-4 mt-4"
        >
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{group.projectName}</h2>
            <div className="grid grid-cols-2 gap-4">
              {group.photos && group.photos.length > 0 ? (
                <img
                  src={group.photos[0]}
                  alt="Project photo"
                  className="w-full h-32 object-cover rounded-md"
                />
              ) : (
                <p className="text-gray-700">No photos available</p>
              )}
            </div>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group ID:</strong> {group.groupId}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Members:</strong> {group.groupMembers.join(', ')}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Technology:</strong> {group.projectTechnology}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Guide Name:</strong> {group.guideName}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Year:</strong> {group.year}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Status:</strong> {group.status ? 'Active' : 'Inactive'}</p>
          </div>
        </Link>
      ))}
    </div>
  </>
) : (
  <div className="h-100p w-100p flex justify-center items-center">
    <div className="h-50p w-50p flex space-x-2 justify-center items-center">
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
    </div>
  </div>
)}

{!groupInfo?.length && !error && <p className="text-gray-500">No group information available.</p>}

  
</div>

  );
};

export default FetchAll;