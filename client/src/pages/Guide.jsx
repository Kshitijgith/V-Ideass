import React, { useEffect, useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GroupActionsT from './components/teacher/GroupActiont';
import CreateGroup from './components/teacher/CreateGroups';
import FetchGroupsT from './components/teacher/FetchgroupT';
import { useNavigate } from 'react-router-dom';
import FetchAll from './components/common/Allgroups';
import EachGroup from './components/common/Eachgroup';
import { Menu, X, Search, User, Key, LogOut } from 'lucide-react';
import UpdateProfile from './components/teacher/UpdateProfile';
import Department from './components/common/Departments';
import  TeacherBoard  from './components/common/TeacherInfo';
import SearchProjects from './components/common/SearchProjects';
const GuideDashboard = () => {
  const navigate=useNavigate();
  const go=()=>{
    localStorage.removeItem('token');
navigate('/');
  }
  const [username, setUsername] = useState('');
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUsername(decoded.email);
    }
  }, []);

  return (
    <div className='h-100p w-100p bg-blue-300 flex flex-col'>
<div className='h-8p w-100p bg-yellow-400 hidden md:flex items-center'>
        <div className=' h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
          {username}
        </div>
        
        <div className='h-100p w-30p relative'>
          <input 
            type='text' 
            placeholder='Search Projects' 
            className='h-100p w-100p pl-10 pr-4 text-xl font-bold text-center bg-white '
          />
        
      <Link
        to='SearchResults' state={{searchText:searchText}}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-bold'
      >
        Go
      </Link>
        </div>
        <div className='h-100p w-50p flex justify-between'>
        <button className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          <Department/>
        </button>
        
        <Link to="FetchGroupsT" className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          Your Group
        </Link>
        
        <Link to="CreateGroup" className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
         Create Group
        </Link>
        <Link to="UpdateProfile" state={{email:username}}  className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          Update Profile
        </Link>
        <button onClick={go} className='h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
          Logout
        </button>
        </div>
        
        </div>


      <div className='h-90p w-100p bg-blue-400 flex flex-col'>
        
        <Routes>
        <Route path="/" element={<FetchAll />} />
        <Route path="/EachGroup" element={<EachGroup />} />
        <Route path="CreateGroup" element={<CreateGroup />} />
          <Route path="CreateGroup" element={<CreateGroup />} />
          <Route path="FetchGroupsT" element={<FetchGroupsT />} />
          <Route path="FetchGroupsT/GroupActionsT" element={<GroupActionsT />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/TeacherInfo" element={<TeacherBoard />} />
          <Route path="/SearchResults" element={<SearchProjects />} />
        </Routes>
      </div>
    </div>
  );
};

export default GuideDashboard;
