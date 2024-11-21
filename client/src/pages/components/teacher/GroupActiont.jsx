import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ChatRoom from '../common/GroupChat';
import { EllipsisVertical } from 'lucide-react';

const GroupActionsT = () => {
  const location = useLocation();
  const { groupId } = location.state || {}; // Get the groupId from the location state
  const [groupInfo, setGroupInfo] = useState(null);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [menu, setMenu] = useState('groupinfo'); // Default menu state
  const[drop,setdrop]=useState(false)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUsername(decoded.email);
    }
  }, []);
  const set=()=>{
setdrop(!drop)
  }
  const setmenu=(val)=>{
    setMenu(val);
    setdrop(!drop)

  }
  const ApproveGroup = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://192.168.29.220:3000/teacher/Approve-group',
        { groupid: groupId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error approving group:', error);
    }
  };

  const fetchGroupById = async () => {
    try {
      const response = await axios.post('http://192.168.29.220:3000/all/Id', {
        id: groupId,
      });

      if (response.data.success) {
        const fetchedGroup = response.data.data[0];
        setGroupInfo(fetchedGroup);
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
      fetchGroupById();
    }
  }, [groupId]);

  return (
    <div className="h-100p w-100p bg-blue-500 flex sm:flex-col items-center sm:items-start sm:justify-start justify-center overflow-y-auto">
      {error && <p className="text-red-500 font-semibold text-lg">{error}</p>}

      {/* Menu button for smaller screens */}
      <div className="h-10p w-100p   flex items-center  sm:flex md:hidden">
      <div className='h-100p w-90p text-white text-2xl font-bold   flex items-center justify-center'>
        <div className='h-100p w-20p'></div>
        <div className='h-100p w-90p flex items-center justify-center'>{menu=='groupinfo' ? 'YourGroups' :'Chatbox' }</div>

      </div>
      <button
          onClick={() => set()}
          className={`h-100p w-10p ${
            menu === 'groupinfo' ? '' : 'bg-blue-500'
          } md:hidden  h-100p w-20p flex items-center justify-center text-white`}
        >
          <EllipsisVertical size={25} className="mr-3 text-white" />
        </button>

      </div>
      {drop ===true && (
        
        <div className="absolute   h-20p w-80p flex flex-row items-end   p-2 z-50">
          <div className='h-100p w-40p'></div>
          <div className='h-100p w-70p flex flex-col items-end '>
          <button
            className=" bg-white h-50p w-80p text-gray-700 hover:bg-gray-200"
            onClick={() => setmenu('groupinfo')}
          >
            Group Info
          </button>
          <button
            className=" bg-white h-50p w-80p text-gray-700 hover:bg-gray-200"
            onClick={() => setmenu('chatbox')}
          >
            Chatbox
          </button>
          </div>
          
          
        </div>
      )}
      {drop==true&&(<div className='h-40p w-40p absolute z-30'></div>)}
      
     
      {/* Group Info Component */}
      <div
        className={`${
          menu === 'groupinfo' ? 'sm:flex' : 'sm:hidden'
        }  md:flex   sm:w-100p sm:h-98p bg-slate-200 h-100p w-60p rounded-lg shadow-md flex flex-col overflow-y-auto`}
      >
        {groupInfo ? (
          <>
            <h2 className="text-3xl font-bold text-black mb-4 px-4 pt-4">
              {groupInfo.projectName}
            </h2>
            <div className="bg-white rounded-md shadow mx-4 mb-4 p-4">
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Group ID:</span> {groupInfo.groupId}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Project Technology:</span>{' '}
                {groupInfo.projectTechnology}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Year:</span> {groupInfo.year}
              </p>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  groupInfo.status
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {groupInfo.status ? 'Active' : 'Inactive'}
              </span>
            </div>

            {/* Additional Info */}
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
                  <li key={index} className="text-gray-700">
                    {member}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-md shadow mx-4 mb-4 p-4">
              <h3 className="text-lg font-semibold mb-2">Photos</h3>
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
          </>
        ) : (
          <p className="text-gray-500">Loading group information...</p>
        )}
      </div>

      {/* ChatBox Component */}
      <div
        className={`${
          menu === 'chatbox' ? ' sm:flex' : 'sm:hidden '
        } md:flex h-100p w-40p sm:w-100p bg-gray-100 flex flex-col overflow-y-auto`}
      >
        <ChatRoom groupId={groupId} yourName={username} role={'teacher'} />
      </div>
    </div>
  );
};

export default GroupActionsT;
