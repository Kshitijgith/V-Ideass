import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import GuideDashboard from './pages/Guide'
import Admin from './pages/Admin';
import StudentDashboard from './pages/StudentDashboard';
import CreateStudent from './pages/components/admin/CreateStudent';
import CreateTeacher from './pages/components/admin/CreateTeacher';
const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

const NavLink = ({ to, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      className={`text-white  rounded transition-all duration-300 ease-in-out transform ${
        isHovered ? 'bg-purple-700 scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
};
const token = localStorage.getItem('token');
var decoded='a'
if(token){
  var decoded=decoded=JSON.parse(atob(token.split('.')[1]));
}
 
  const nemail=decoded.email;
  
const App = () => {
  
  
  return (

    <Router>
      
      <div className='h-screen w-100p bg-black flex flex-col'>
      <div className='h-10p w-100p bg-white text-bold text-center flex items-center justify-center shadow-lg rounded-lg'>
  <p className='text-xl text-gray-800 font-extrabold'>
    V-Ideas
  </p>
</div>
        <div className='h-90p w-100p bg-blue-400 flex flex-col'>
        
            <Routes>
              <Route path="/" element={<Home />} />        
              <Route path={`admin/${nemail}`} element={<Admin />} />

              <Route path={`/admin/${nemail}/CreateStudent`} element={<CreateStudent />} />
              <Route path={`admin/${nemail}/CreateTeacher`} element={<CreateTeacher />} />
{/* <Route path={`${nemail}/studentdashboard/*`} element={<StudentDashboard />} /> */}
<Route path="/StudentDashBoard/*" element={<StudentDashboard />} />
<Route path="/guide/*" element={<GuideDashboard />} />
            </Routes>
            
    
        </div>
       
      </div>
    
    </Router>
  );
};

export default App;