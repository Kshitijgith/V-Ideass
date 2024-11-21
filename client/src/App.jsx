import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import GuideDashboard from './pages/Guide'
import Admin from './pages/Admin';
import StudentDashboard from './pages/StudentDashboard';
import ForgotPassword from './pages/components/common/ForgotPassword';

import EachGroup from './pages/components/common/Eachgroup';
import VITlogo from './assets/logo_vit.png';
import VIT from './assets/VIT.png';



const token = localStorage.getItem('token');
var decoded='a'
if(token){
  var decoded=decoded=JSON.parse(atob(token.split('.')[1]));
}
 
  
const App = () => {
  
  
  return (

    <Router>
      
      <div className='h-screen w-screen bg-white flex flex-col'>
      <div className='h-10p w-100p bg-blue-950 flex justify-evenly '>
        <div className='w-30p h-100p flex items-center'>
        <img className='h-60p w-40p sm:h-60p sm:w-100p ' src={VITlogo} alt="Toyota Background" />
        </div>
        <div className='h-100p w-50p flex justify-end items-center '>
        <img className='h-60p w-40p sm:h-50p sm:w-60p' src={VIT} alt="Toyota Background" />
        </div>
      
</div>
      {/* <div
  className="h-10p w-100p  text-bold text-center flex justify-center items-center  " >
     <img className='h-100p w-50p bg-cover' src={sampleImage}  /> 
     
</div> */}
        <div className='h-90p w-100p  bg-red-100  flex flex-col justify-center items-center overflow-y-auto '>
        
            <Routes >
              <Route path="/" element={<Home />} /> 
              <Route path="/ForgotPassword" element={<ForgotPassword />} /> 
              <Route path="/Eachgroup" element={<EachGroup />} />        
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