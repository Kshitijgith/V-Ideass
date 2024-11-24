import React, { useEffect, useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GroupActionsT from './components/teacher/GroupActiont';
import CreateGroup from './components/teacher/CreateGroups';
import FetchGroupsT from './components/teacher/FetchgroupT';
import { useNavigate } from 'react-router-dom';
import FetchAll from './components/common/Allgroups';
import EachGroup from './components/common/Eachgroup';
import { Menu, X, Search, User, Key, LogOut,SquarePlus } from 'lucide-react';

import UpdateProfile from './components/teacher/UpdateProfile';
import Department from './components/common/Departments';
import  TeacherBoard  from './components/common/TeacherInfo';
import SearchProjects from './components/common/SearchProjects';
import MobileDepartment from './components/common/MobileDepartment';
import TeacherMobile from './components/common/TeacherMobile';
const GuideDashboard = () => {
  const navigate=useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var[dept,setdept]=useState(true)
  const toggle=()=>{
    setIsMenuOpen(!isMenuOpen)
  }

  const go=()=>{
    localStorage.removeItem('token');
navigate('/');
  }
  const [searchText, setSearchText] = useState('');
  const setSearch=(text)=>{
    setSearchText(text);
    <Link
        to='SearchResults' state={{searchText:searchText}}
        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-500 font-bold'
      />

  }
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(!token){
      navigate('/')
    }
    if (token) {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setUsername(decoded.email);
    }
  }, []);

  return (
    

    <div className='h-100p w-100p  flex flex-col  justify-center items-center'>
      {isMenuOpen && (
        <div className='h-60p w-80p bg-blue-900 bg-opacity-70 flex flex-col items-center  absolute z-10'>
           <div className=' h-10p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
          {username}
        </div>
          <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
          <User size={20} className="h-70p w-20p text-white" />
          <Link
              to="FetchGroupsT"
               className='h-100p w-90p text-start flex items-center'
            >
              
              
              Your Group
            </Link>
          </button>
          
            <div className='h-10p w-100p'></div>
            <button onClick={()=>{setdept(!dept)}} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
              
            <MobileDepartment toggle={toggle} role='guide' />

          </button>
          <div className='h-10p w-100p'></div>
          <button onClick={toggle}  className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
          <SquarePlus size={20} className="h-70p w-20p text-white" />
          <Link to="CreateGroup" className="h-100p w-90p text-start flex items-center">
         Create Group
        </Link>
          </button>
          <div className='h-10p w-100p'></div>
          <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
          <Key size={18} className="h-70p w-20p text-white" />

          <Link
             to="UpdateProfile" state={{email:username}}
             className='h-100p w-90p text-start flex items-center'
            >
              
              Update Password
            </Link>
          </button>
          <div className='h-10p w-100p'></div>
          
          
            <div className='h-10p w-100p'></div>
            <button
            onClick={go}
            className="flex items-center text-white h-10p w-80p px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200"
          >
            <LogOut size={18} className="mr-3 text-white" />
            Logout
          </button>
          <div className='h-10p w-100p'></div>
        

        
      </div>
      
        
      )}
<div className='h-8p w-100p bg-yellow-400 sm:hidden md:flex items-center '>
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
        <div className='h-10p w-100p bg-yellow-400 flex items-end justify-end md:hidden '>
        <div className='h-100p w-90p flex justify-center items-center   '>
        <div className='h-80p w-90p border rounded-xl bg-white flex'>
        <input
        type='text'
        placeholder='Search Projects'
        value={searchText}
        onChange={(e) => setSearch(e.target.value)
          
        }
        className='h-100p w-90p pl-10 pr-4 text-xl font-bold text-center border rounded-xl bg-white'
      />
       <Link
        to='SearchResults'  state={{searchText:searchText}}
        className=' h-100p w-10p flex justify-center items-center'
      >
       <Search  size={24} className='color-black' />
      </Link>
        </div>
      
      
     
    </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='text-white focus:outline-none h-100p w-10p'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className='h-90p w-100p bg-paleBlue flex flex-col'>
        
        <Routes>
        <Route path="/" element={<FetchAll />} />
        <Route path="/EachGroup" element={<EachGroup />} />
        <Route path="CreateGroup" element={<CreateGroup />} />
          <Route path="CreateGroup" element={<CreateGroup />} />
          <Route path="FetchGroupsT" element={<FetchGroupsT />} />
          <Route path="FetchGroupsT/GroupActionsT" element={<GroupActionsT />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/TeacherInfo" element={<TeacherBoard />} />
         
          <Route path="/Teachers" element={<TeacherMobile />} />
          
          <Route path="/SearchResults" element={<SearchProjects />} />
        </Routes>
      </div>
    </div>
  );
};

export default GuideDashboard;
