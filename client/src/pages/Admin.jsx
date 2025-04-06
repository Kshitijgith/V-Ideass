import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import CreateStudent from './components/admin/CreateStudent';
import CreateTeacher from './components/admin/CreateTeacher';
import  GenerateReport from './components/admin/GenrateReport'
const Admin = () => {
  const navigate=useNavigate();
  const go=()=>{
    localStorage.removeItem('token');
navigate('/');
  }
const [username,setUsername]=useState();

useEffect(() => {
    
     const token = localStorage.getItem('token');
       
    if (token) {
      
      const decoded = JSON.parse(atob(token.split('.')[1]));
      // console.log(decoded.email);
      setUsername(decoded.email);
    }
  }, []);

  return (
    <div className='h-100p w-100p lg bg-blue-300 flex flex-col'>
      <div className='h-8p sm:h-2p w-100p bg-yellow-400  flex  justify-center items-center'>
      <p className="text-lg  sm:text-sm items-center h-50p   flex justify-center">Welcome,{username} You can manage users here.</p>
      </div>
      <div className='h-92p w-100p   flex justify-center items-center'>
      <Routes>
        <Route path="/" element={<div className="flex flex-col h-92p w-100p items-center justify-center">
        <div className='flex flex-col h-50p w-30p justify-evenly '>
        <Link to="CreateStudent" className="text-center flex items-center justify-center h-20p w-100p bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
          Add Student
        </Link>
        <Link to="CreateTeacher" className=" flex items-center justify-center h-20p w-100p bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
          Add Guide
        </Link>
        <Link to="GenerateReport" className=" flex items-center justify-center h-20p w-100p bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
          Genrate Report
        </Link>
        <button onClick={go} className="h-20p w-100p bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-600 transition">
          Logout
        </button>
        </div>
        
      </div>} />
      <Route path={`/CreateStudent`} element={<CreateStudent />} />
              <Route path={`/CreateTeacher`} element={<CreateTeacher />} />
              <Route path={`/GenerateReport`} element={<GenerateReport />} />
</Routes>
      </div>
      
    </div>
    
    
  );
};

export default Admin;
