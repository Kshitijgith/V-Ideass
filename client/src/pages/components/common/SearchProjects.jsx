import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchProjects = () => {
  const location = useLocation();
  const [groupInfo, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNoDataMessage, setShowNoDataMessage] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        setShowNoDataMessage(false);

        const timeout = setTimeout(() => {
          setShowNoDataMessage(true);
        }, 10000); // Timeout for showing no data message

        const { searchText } = location.state || {};
        if (searchText) {
          const response = await axios.post(
            'http://192.168.29.220:3000/all/Search-Groups',
            { query: searchText }
          );

          if (response.data.success) {
            setSearchResults(response.data.data);
          } else {
            setError('Failed to fetch group information.');
          }
        } else {
          setSearchResults([]);
        }

        clearTimeout(timeout); // Clear timeout if data loads in time
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.state]);

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-start overflow-y-auto bg-paleBlue">
      {/* Loading Indicator */}
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
                      <strong className="font-semibold">Status:</strong>{' '}
                      {group.status ? 'Active' : 'Inactive'}
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

      {/* Error Message */}
      {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}
    </div>
  );
};

export default SearchProjects;
