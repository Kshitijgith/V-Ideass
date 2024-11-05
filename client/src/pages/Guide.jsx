import React, { useEffect, useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GroupActionsT from './components/teacher/GroupActiont';
import CreateGroup from './components/teacher/CreateGroups';
import FetchGroupsT from './components/teacher/FetchgroupT';
import { useNavigate } from 'react-router-dom';
import FetchAll from './components/common/Allgroups';

const GuideDashboard = () => {
  const navigate=useNavigate();
  const go=()=>{
    localStorage.removeItem('token');
navigate('/');
  }
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUsername(decoded.email);
    }
  }, []);

  return (
    <div className='h-100p w-100p bg-blue-300 flex flex-col'>
      <div className='h-10p w-100p bg-slate-500 flex'>
        <div className=' text-2xl h-100p  w-20p text-center font-extrabold flex items-center justify-center'>{username}</div>
        <input type='text' placeholder='Search Projects' className='h-100p w-40p text-2xl font-extrabold text-center bg-slate-100'/>
      <Link to="FetchGroupsT" className="h-100p w-10p font-extrabold border-zinc-700 border-solid border-4 flex items-center justify-center bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition text-center">
  Your Group
</Link>
<Link to="CreateGroup" className="h-100p w-10p font-extrabold border-zinc-700 border-solid border-4 flex items-center justify-center bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition text-center">
  Create Group
</Link>
<Link to="FetchGroupsT" className="h-100p w-10p font-extrabold border-zinc-700 border-solid border-4 flex items-center justify-center bg-purple-500 text-white rounded-lg shadow-lg hover:bg-purple-600 transition text-center">
  Update password
</Link>
<button onClick={go}  className='className="h-100p w-20p font-extrabold border-zinc-700 border-solid border-4 flex items-center justify-center bg-white '>Logout</button>
        
      </div>



      <div className='h-90p w-100p bg-blue-400 flex flex-col'>
        
        <Routes>
        <Route path="/" element={<FetchAll />} />
          <Route path="CreateGroup" element={<CreateGroup />} />
          <Route path="FetchGroupsT" element={<FetchGroupsT />} />
          <Route path="FetchGroupsT/GroupActionsT" element={<GroupActionsT />} />
        </Routes>
      </div>
    </div>
  );
};

export default GuideDashboard;
