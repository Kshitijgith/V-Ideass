import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EachGroup = () => {
  const location = useLocation();
  const { groupId } = location.state || {}; // Get the groupId from the location state
  
  const [groupInfo, setGroupInfo] = useState(null); // Change to null initially since we're fetching one group
  const [error, setError] = useState('');

  const fetchGroupById = async () => {
    try {
      const response = await axios.post(`http://192.168.29.220:3000/all/Id`, {
        id: groupId, // Send the groupId in the request body
      });

      if (response.data.success) {
        const fetchedGroup = response.data.data[0];

        setGroupInfo(fetchedGroup); // Set the specific group information
        

      } else {
        setError('Failed to fetch group information.');
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Group not found.');
      } else {
        console.error('Error fetching group:', err);
        setError('An error occurred while fetching the group.');
      }
    }
  };

  useEffect(() => {
    if (groupId) {
      fetchGroupById(); // Fetch group info when the component mounts
      
    }
  }, [groupId]);
  

  return (
    <div className="h-100p w-100p bg-slate-100 flex items-center justify-center overflow-y-auto">
      {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

      {groupInfo ? (
        <div className="bg-gray-200 h-100p w-100p rounded-lg shadow-md flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-bold  mb-4 px-4 pt-4">{groupInfo.projectName}</h2>
          
          <div className="bg-white rounded-md shadow mx-4 mb-4 p-4">
            <p className="text-gray-700 mb-1"><span className="font-semibold">Group ID:</span> {groupInfo.groupId}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Project Technology:</span> {groupInfo.projectTechnology}</p>
            <p className="text-gray-700 mb-1"><span className="font-semibold">Year:</span> {groupInfo.year}</p>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${groupInfo.status ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {groupInfo.status ? 'Active' : 'Inactive'}
            </span>
          </div>

          <div className="bg-white rounded-md shadow mx-4 mb-4 p-4">
            <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
            <p className="text-gray-700">{groupInfo.projectinfo}</p>
          </div>

          <div className="bg-white rounded-md shadow mx-4 mb-4 p-4">
            <h3 className="text-lg font-semibold mb-2">Project Guide</h3>
            <p className="text-gray-700">{groupInfo.guideName}</p>
          </div>
           
          <div className="bg-white rounded-md shadow mx-4 mb-4 p-4">
            <h3 className="text-lg font-semibold mb-2">Project Members</h3>
            <ul className="list-disc pl-5 space-y-1">
              {groupInfo.groupMembers.map((member, index) => (
                <li key={index} className="text-gray-700">{member}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-md shadow mx-4 mb-4 p-4 flex flex-col  ">
            <h3 className="text-lg font-semibold mb-2">Pictures</h3>
            <div className="grid grid-cols-2 gap-4">
              {groupInfo.photos && groupInfo.photos.length > 0 ? (
                groupInfo.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Project photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))
              ) : (
                <p className="text-gray-700">No photos available</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading group information...</p>
      )}
      
    
      
    </div>
  );
};

export default EachGroup;


