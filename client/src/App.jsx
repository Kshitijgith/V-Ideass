import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import GuideDashboard from './pages/Guide'
import Admin from './pages/Admin';
import StudentDashboard from './pages/StudentDashboard';
import CreateStudent from './pages/components/admin/CreateStudent';
import CreateTeacher from './pages/components/admin/CreateTeacher';
import VITlogo from './assets/logo_vit.png';
import VIT from './assets/VIT.png';
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
 
  
const App = () => {
  
  
  return (

    <Router>
      
      <div className='h-screen w-100p bg-white flex flex-col'>
      <div className='h-10p w-100p bg-blue-950 flex justify-evenly '>
        <div className='w-30p h-100p flex items-center'>
        <img className='h-60p w-40p ' src={VITlogo} alt="Toyota Background" />
        </div>
        <div className='h-100p w-50p flex justify-end items-center '>
        <img className='h-60p w-40p ' src={VIT} alt="Toyota Background" />
        </div>
      
</div>
      {/* <div
  className="h-10p w-100p  text-bold text-center flex justify-center items-center  " >
     <img className='h-100p w-50p bg-cover' src={sampleImage}  /> 
     
</div> */}
        <div className='h-90p w-100p  bg-red-100  flex flex-col'>
        
            <Routes>
              <Route path="/" element={<Home />} />        
              <Route path={`admin/*`} element={<Admin />} />
 
<Route path="/StudentDashBoard/*" element={<StudentDashboard />} />
<Route path="/guide/*" element={<GuideDashboard />} />
            </Routes>
            
    
        </div>
       
      </div>
    
    </Router>
  );
};

export default App;