import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FetchGroupsT = () => {
  const [groupInfo, setGroupInfo] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading state

  const fetchGroups = async () => {
    try {
      const t = `Bearer ${localStorage.getItem('token')}`;
      const response = await axios({
        method: 'POST',
        url: `https://v-ideass-1.onrender.com/teacher/find-group`,
        headers: {
          Authorization: t,
        },
      });

      if (response.data.success) {
        setGroupInfo(response.data.data);
      } else {
        setError('Failed to fetch group information.');
      }
    } catch (err) {
      setError(err.response.data.message)
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-start sm:items-center bg-paleBlue overflow-y-auto">
      {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <div className="w-12   h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-wrap h-90p w-90p">
          {groupInfo && groupInfo.length > 0 ? (
            groupInfo.map((group, index) => (
              <Link
                to="GroupActionsT"
                state={{ groupId: group.groupId }}
                key={index}
                className="w-1/4 sm:w-100p sm:h-80p p-4 "
              >
                <div className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 h-full sm:h-100p sm:w-100p">
                  <div className="sm:h-8p h-20p w-100p flex items-center justify-center">
                    <strong className="font-bold text-2xl text-center">
                      {group.projectName && group.projectName.length < 20
                        ? group.projectName
                        : `${group.projectName?.slice(0, 20)}...`}
                    </strong>
                  </div>

                  <div className="h-40p w-100p flex justify-center">
                    {group.photos && Array.isArray(group.photos) && group.photos.length > 0 ? (
                      <img
                        src={group.photos[0]}
                        alt="Project photo"
                        className="w-90p h-90p rounded-md object-cover"
                      />
                    ) : (
                      <p className="text-gray-700">No photos available</p>
                    )}
                  </div>

                  <p className="text-gray-700 mb-1">
                    <strong className="font-semibold">Group ID:</strong> {group.groupId}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong className="font-semibold">Group Members:</strong>{' '}
                    {Array.isArray(group.groupMembers) && group.groupMembers.length > 0
                      ? group.groupMembers.slice(0, 2).join(', ') +
                        (group.groupMembers.length > 2 ? '...' : '')
                      : 'N/A'}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong className="font-semibold">Group Leader:</strong> {group.groupLeader || 'N/A'}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong className="font-semibold">Guide Name:</strong> {group.guideName || 'N/A'}
                  </p>

                  <p className="text-gray-700 mb-1">
                    <strong className="font-semibold">Year:</strong> {group.year || 'N/A'}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No group information available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchGroupsT;