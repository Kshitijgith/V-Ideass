import React, { useEffect, useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FetchGroups from './components/student/FetchGroups';
import { useNavigate } from 'react-router-dom';
import FetchAll from './components/common/Allgroups';
import GroupActions from './components/student/GroupAction';
import EachGroup from './components/common/Eachgroup';
import { Menu, X, Search, User, Key, LogOut } from 'lucide-react';
const StudentDashboard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();
  const go=()=>{
    localStorage.removeItem('token');
navigate('/');
  }
  const toggle=()=>{
    setIsMenuOpen
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
    <div className='h-100p w-100p lg bg-blue-300 flex flex-col'>
       {isMenuOpen && (
        <div className='h-100p w-100p bg-slate-500 flex items-center z-30'>
          <div className='absolute  left-0 right-0 bg-slate-500 shadow-lg p-4 md:hidden '>
          <Link to="FetchGroups" className="flex items-center text-white py-2">
            <User size={18} className="mr-2" /> Your Group
          </Link>
          <Link to="FetchGroups" className="flex items-center text-white py-2">
            <Key size={18} className="mr-2" /> Update Password
          </Link>
          <button onClick={go} className='flex items-center text-white py-2 w-full text-left'>
            <LogOut size={18} className="mr-2" /> Logout
          </button>
          
        </div>
        </div>
        
      )}
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
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={24} />
        </div>
        <div className='h-100p w-50p flex justify-between'>
        <Link to="FetchGroups" className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          Departments
        </Link>
        
        <Link to="FetchGroups" className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          Your Group
        </Link>
        
        <Link to="FetchGroups" className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          Update Password
        </Link>
        
        <button onClick={go} className='h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
          Logout
        </button>
        </div>
        
        </div>
       
      
      
        <div className='h-10p w-100p flex items-end justify-end md:hidden '>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='text-white focus:outline-none h-100p w-10p'
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
  
      <div className='h-92p w-100p bg-slate-200 flex flex-col'>
      
        <Routes>
        <Route path="/" element={<FetchAll />} />
        <Route path="/EachGroup" element={< EachGroup/>} />
          <Route path="FetchGroups" element={<FetchGroups />} />
          <Route path="FetchGroups/GroupActions" element={<GroupActions />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
