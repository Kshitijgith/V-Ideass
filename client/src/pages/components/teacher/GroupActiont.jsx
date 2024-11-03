import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const GroupActionsT = () => {
  const location = useLocation();
  const { groupId } = location.state || {}; // Get the groupId from the location state
  const [groupInfo, setGroupInfo] = useState(null); // Change to null initially since we're fetching one group
  const [error, setError] = useState('');

  const fetchGroupById = async () => {
    try {
      const response = await axios.post(`http://192.168.0.105:3000/all/Id`, {
        id: groupId, // Send the groupId in the request body
      });

      if (response.data.success) {
        // Assuming the response data is an array, get the first item
        const fetchedGroup = response.data.data[0]; // Access the first item in the array
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
    <div className="h-100p w-100p flex flex-row ">
      {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

      {groupInfo ? (
        <div className="w-60p h-100p">
          <div className="bg-slate-200 flex flex-col overflow-y-auto shadow-md  h-full items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Group Information</h2>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group ID:</strong> {groupInfo.groupId}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Leader:</strong> {groupInfo.groupLeader}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Guide Name:</strong> {groupInfo.guideName}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Year:</strong> {groupInfo.year}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Status:</strong> {groupInfo.status ? 'Active' : 'Inactive'}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Loading group information...</p>
      )}
    </div>
  );
};

export default GroupActionsT;