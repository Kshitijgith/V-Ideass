import React, { useEffect, useState,  } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FetchGroups from './components/student/Fetchgroups';
import { useNavigate } from 'react-router-dom';
import FetchAll from './components/common/Allgroups';
import GroupActions from './components/student/GroupAction';
import EachGroup from './components/common/Eachgroup';
import Department from './components/common/Departments';
import { Menu, X, Search, User, Key, LogOut,House } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import  TeacherBoard  from './components/common/TeacherInfo';
import UpdateProfile from './components/student/Updateprofile';
import SearchProjects from './components/common/SearchProjects';
import MobileDepartment from './components/common/MobileDepartment';
import TeacherMobile from './components/common/TeacherMobile';
import { matchPath, } from 'react-router-dom';
import GenerateReport from './components/student/GenrateReport';
const StudentDashboard = () => {
  
  const location = useLocation();
  
  console.log(location.pathname);
  

  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var[dept,setdept]=useState(true)
  const navigate=useNavigate();
  const go=()=>{
    localStorage.removeItem('token');
navigate('/');
  }
  const toggle=()=>{
    setIsMenuOpen(!isMenuOpen)
  }
  
  const [username, setUsername] = useState('');
  const [searchText, setSearchText] = useState('');
   // Runs every time the route changes
   const [val, setval] = useState(false); // State to store the current path

  useEffect(() => {
    if (matchPath('/StudentDashBoard/SearchResults/:groupId', location.pathname)){
      setSearchText('');
      console.log(true);
     }
     else{
      if (searchText.trim()) {
        // Navigate to SearchResults page with the searchText
        navigate('SearchResults', { state: { searchText: searchText } });
      }
     }
    
  }, [searchText, navigate,location.pathname]);
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
// console.log(searchText)
  return (
    <div className='h-100p w-100p lg bg-customBlue flex flex-col items-center justify-center bg-paleBlue  '>
       {isMenuOpen && (
        <div className={`${username==='guest@vit.edu.in'?'justify-normal':'justify-between'} h-60p w-80p bg-blue-950 flex flex-col items-center  absolute z-10`}>
           <div className=' h-10p w-20p font-extrabold text-white  flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950'>
          {username}
        </div>
        <button onClick={toggle} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
        &nbsp;&nbsp;
          <House size={20} className="h-70p w-10p text-white" />
          <Link
              to="/StudentDashBoard"
               className='h-100p w-90p text-start flex items-center'
            >
              
              
              &nbsp;&nbsp;Home
            </Link>
          </button>
          <div className='h-10p w-100p'></div>
          <button onClick={toggle} className={`${username==='guest@vit.edu.in'?'hidden':''} flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200`}>
          &nbsp;&nbsp;
          <User size={20} className="h-70p w-10p text-white" />
          <Link
              to="FetchGroups"
               className='h-100p w-90p text-start flex items-center'
            >
              
              
              &nbsp;&nbsp;Your Group
            </Link>
          </button>
          
            <div className={`h-10p w-100p ${username==='guest@vit.edu.in'?'hidden':''}`}></div>
            <button onClick={()=>{setdept(!dept)}} className="flex items-center text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200">
            &nbsp;&nbsp;
            <MobileDepartment toggle={toggle} role={'studentdashboard'} />

          </button>
          <div className={`h-10p w-100p ${username==='guest@vit.edu.in'?'hidden':''}`}></div>
          <button onClick={toggle} className={`flex items-center ${username==='guest@vit.edu.in'?'hidden':''} text-white h-10p w-80p rounded-lg bg-blue-600 hover:bg-blue-700 transition duration-200`}>
          &nbsp;&nbsp;&nbsp;
          <Key size={20} className="mr-3 text-white" />
          <Link
              to="UpdateProfile"
              state={{Email:username}}
             className='h-100p w-90p text-start flex items-center'
            >
              
              Update Password
            </Link>
          </button>
          
          
            <div className='h-10p w-100p'></div>
            <button
            onClick={go}
            className={`flex items-center text-white h-10p w-80p px-4 rounded-lg bg-red-600 hover:bg-red-700 transition duration-200`}
          >
            <LogOut size={20} className="mr-3 text-white" />
            Logout
          </button>
          <div className='h-10p w-100p'></div>
        

        
      </div>
      
        
      )}
        <div className={`h-8p w-100p bg-yellow-400 sm:hidden md:flex items-center`}>
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
        {/* Menu navigation links */}
      
        <div className={`h-100p w-50p  ${username==='guest@vit.edu.in'?'justify-end':'justify-between'} flex `}>
        <div className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          <Department/>
        </div>
        <button className="h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950">
          <GenerateReport/>
        </button>
        <Link to="FetchGroups" className={` ${username==='guest@vit.edu.in'?'hidden':''} h-100p w-20p font-extrabold   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950`}>
          Your Group
        </Link>
        
        <Link to="UpdateProfile" state={{Email:username}} className={`h-100p w-20p font-extrabold ${username==='guest@vit.edu.in'?'hidden':''}   flex items-center justify-center transition text-center hover:text-white hover:bg-blue-950`}>
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
  
      <div className='h-92p w-100p bg-paleBlue flex flex-col '>
      
        <Routes>
        <Route path="/" element={<FetchAll />} />
        <Route path="/EachGroup" element={< EachGroup/>} />
        
          <Route path="FetchGroups" element={<FetchGroups />} />
          <Route path="FetchGroups/GroupActions" element={<GroupActions />} />
          <Route path="/TeacherInfo" element={<TeacherBoard />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/SearchResults" element={<SearchProjects />} />
          <Route path="/Teachers" element={<TeacherMobile />} />
          <Route path="/MTeacherInfo" element={<TeacherBoard />} />
          <Route path="/SearchResults/:groupId" element={<EachGroup />} />
        </Routes>
      </div>
    </div>
  );
};

export default StudentDashboard;
