import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FetchAll = () => {
  const [groupInfo, setGroupInfo] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [showNoDataMessage, setShowNoDataMessage] = useState(false); // For prolonged loading

  const fetchGroups = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: `https://v-ideass-1.onrender.com/all/all-groups`,
      });

      if (response.data.success) {
        setGroupInfo(response.data.data);
      } else {
        setError('Failed to fetch group information.');
      }
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false); // Stop loading once fetch completes
    }
  };

  useEffect(() => {
    fetchGroups();

    
  },[]);

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-start overflow-y-auto">
      {loading ? (
        <div className="h-100p w-100p flex justify-center items-center">
          <div className="h-50p w-50p flex space-x-2 justify-center items-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-200"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse delay-400"></div>
          </div>
        </div>
      ) : groupInfo && groupInfo.length > 0 ? (
        <>
          {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}
          <div className="flex flex-wrap justify-around h-100p w-100p overflow-y-auto">
            <div className="h-10p w-100p"></div>
            {groupInfo.map((group, index) => (
              <Link
                to="EachGroup"
                state={{ groupId: group.groupId }}
                key={index}
                className="w-30p h-80p sm:w-80p sm:h-80p"
              >
                <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 lg:h-[400px] sm:h-90p flex flex-col justify-between">
                  <div className="sm:h-8p flex items-center justify-center">
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
                      <strong className="font-semibold">Group Members:</strong>{' '}
                      {group.groupMembers.slice(0, 2).join(', ')}
                      {group.groupMembers.length > 2 && '...'}
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
            <div className="h-20p w-100p"></div>
          </div>
        </>
      ) : showNoDataMessage ? (
        <p className="text-gray-500 text-center">No group information available.</p>
      ) : null}
    </div>
  );
};

export default FetchAll;
