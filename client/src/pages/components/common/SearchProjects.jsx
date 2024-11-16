import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import {Routes,Route,Link} from 'react-router-dom'
const SearchProjects = () => {
  const location = useLocation();
  const [groupInfo, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const {searchText} = location.state
        if (searchText) {
          const response = await axios.post('http://192.168.29.220:3000/all/Search-Groups',
            {query:searchText}
          );
         
          setSearchResults(response.data.data );
          
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        setError('Failed to fetch search results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [location.state]);

  return (
    <div className="h-100p w-100p flex flex-col justify-center items-start overflow-y-auto  bg-red-100">
     
     {groupInfo && groupInfo.length > 0 ? (
  <>
    
    <div className="flex flex-row h-100p w-100p">
      {groupInfo.map((group, index) => (
        <Link 
          to="EachGroup" 
          state={{ groupId: group.groupId }} // Pass groupId in the state
          key={index} 
          className="w-1/4 p-4 mt-4"
        >
          <div className="bg-white p-6 rounded-lg  transition-transform transform hover:scale-105 h-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{group.projectName}</h2>
            <div className="h-50p w-100p ">
              {group.photos && group.photos.length > 0 ? (
                <img
                  src={group.photos[0]}
                  alt="Project photo"
                  className="w-full h-100p object-cover rounded-md"
                />
              ) : (
                <p className="text-gray-700">No photos available</p>
              )}
            </div>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group ID:</strong> {group.groupId}</p>
            <p className="text-gray-700 mb-1"><strong className="font-semibold">Group Members:</strong> {group.groupMembers.join(', ')}</p>
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

export default SearchProjects;
