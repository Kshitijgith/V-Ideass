import React, { useEffect, useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GroupActionsT from './components/teacher/GroupActiont';
import CreateGroup from './components/teacher/CreateGroups';
import FetchGroupsT from './components/teacher/FetchgroupT';
import { useNavigate } from 'react-router-dom';
import FetchAll from './components/common/Allgroups';
import EachGroup from './components/common/Eachgroup';
import { Menu, X, Search, User, Key, LogOut,SquarePlus,House,CirclePlus } from 'lucide-react';
import GenerateReport from './components/teacher/GenrateReport';
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
  useEffect(() => {
    if (searchText.trim()) {
      // Navigate to SearchResults page with the searchText
      navigate('SearchResults', { state: { searchText: searchText } });
    }
  }, [searchText, navigate]);
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
    

    <div className={'h-100p w-100p flex flex-col justify-center items-center '}>
      {isMenuOpen && (
  <div className='h-60p w-80p bg-blue-950 flex flex-col items-center absolute z-10 opacity-100'>
    <div className='h-10p w-20p font-extrabold text-white flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
      {username}
    </div>
    <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
      &nbsp;&nbsp;
      <House size={20} className="h-70p w-10p text-white" />
      <Link
        to="/guide"
        className='h-100p w-90p text-start flex items-center'
      >
        &nbsp;&nbsp;Home
      </Link>
    </button>
    
    <div className={`h-10p w-100p ${username==='guest@vit.edu.in'?'hidden':''}`}></div>
              <div className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
                &nbsp;&nbsp;
                <GenerateReport/>
              </div>
              <div className='h-10p w-100p'></div>
    <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
      &nbsp;&nbsp;
      <User size={20} className="h-70p w-10p text-white" />
      <Link
        to="FetchGroupsT"
        className='h-100p w-90p text-start flex items-center'
      >
        &nbsp;&nbsp;Your Group
      </Link>
    </button>
    <div className='h-10p w-100p'></div>
    <button onClick={() => { setdept(!dept); }} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
      &nbsp;
      <MobileDepartment toggle={toggle} role='guide' />
    </button>
    
    <div className='h-10p w-100p'></div>
    <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
      &nbsp;&nbsp;
      <CirclePlus size={20} className="h-70p w-10p text-white" />
      &nbsp;&nbsp;
      <Link
        to="CreateGroup"
        className="h-100p w-90p text-start flex items-center"
      >
        Create Group
      </Link>
    </button>
    <div className='h-10p w-100p'></div>
    <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
      &nbsp;&nbsp;&nbsp;
      <Key size={20} className="mr-3 text-white" />
      <Link
        to="UpdateProfile"
        state={{ email: username }}
        className='h-100p w-90p text-start flex items-center'
      >
        Update Password
      </Link>
    </button>
    <div className='h-10p w-100p'></div>
    <button
      onClick={go}
      className="flex items-center text-white h-10p w-80p px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200"
    >
      <LogOut size={20} className="mr-3 text-white" />
      Logout
    </button>
    <div className='h-10p w-100p'></div>
  </div>
)}

<div className='h-8p w-100p bg-yellow-400 sm:hidden md:flex items-center '>
        <div className=' h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
          {username}
        </div>
        
        <div className='h-100p w-30p bg-blue-300 relative'>
          <input
            type='text'
            placeholder='Search Projects'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}  // Update searchText on input change
            className='h-100p w-100p pl-10 pr-4 text-xl font-bold text-center bg-white'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={24} />
        </div>
        <div className='h-100p w-50p flex justify-between'>
        <button className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          <Department/>
        </button>
        <button className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          <GenerateReport/>
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
        <div className='h-100p w-100p bg-blue-300 relative'>
          <input
            type='text'
            placeholder='Search Projects'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}  // Update searchText on input change
            className='h-100p w-100p pl-10 pr-4 text-xl font-bold text-center bg-white'
          />
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={24} />
        </div>
       

      
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
          <Route path="/SearchResults" element={<SearchProjects />} />
          <Route path="/Teachers" element={<TeacherMobile />} />
          <Route path="/SearchResults/:groupId" element={<EachGroup />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default GuideDashboard;
